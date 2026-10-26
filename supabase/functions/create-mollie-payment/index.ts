import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const headers={"Access-Control-Allow-Origin":Deno.env.get("APP_URL")||"*","Access-Control-Allow-Headers":"authorization, apikey, content-type, x-client-info","Access-Control-Allow-Methods":"POST, OPTIONS","Content-Type":"application/json"};
Deno.serve(async req=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers});
 if(req.method!=="POST")return new Response("Method not allowed",{status:405,headers});
 try{
  const url=Deno.env.get("SUPABASE_URL")!,anon=Deno.env.get("SUPABASE_ANON_KEY")!,service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,mollieKey=Deno.env.get("MOLLIE_API_KEY"),appUrl=Deno.env.get("APP_URL");
  if(!mollieKey||!appUrl)throw new Error("Payment service is not configured.");
  const userDb=createClient(url,anon,{global:{headers:{Authorization:req.headers.get("Authorization")||""}}});
  const{data:auth,error:authErr}=await userDb.auth.getUser();if(authErr||!auth.user)return new Response(JSON.stringify({error:"Unauthorized"}),{status:401,headers});
  const{reservationId}=await req.json();
  const{data:r,error}=await userDb.from("reservations").select("id,created_by,price_cents,payment_status,status,family_members(name)").eq("id",reservationId).single();
  if(error||!r||r.created_by!==auth.user.id||r.status!=="confirmed"||["paid","cancelled","refunded"].includes(r.payment_status))return new Response(JSON.stringify({error:"Reservatie kan niet betaald worden."}),{status:403,headers});
  const admin=createClient(url,service);
  const{data:existing}=await admin.from("payments").select("checkout_url").eq("reservation_id",r.id).eq("status","open").order("attempt",{ascending:false}).limit(1).maybeSingle();
  if(existing?.checkout_url)return new Response(JSON.stringify({checkoutUrl:existing.checkout_url}),{headers});
  const{count}=await admin.from("payments").select("id",{count:"exact",head:true}).eq("reservation_id",r.id);
  const attempt=(count||0)+1,amount=(r.price_cents/100).toFixed(2);
  const response=await fetch("https://api.mollie.com/v2/payments",{method:"POST",headers:{Authorization:"Bearer "+mollieKey,"Content-Type":"application/json","Idempotency-Key":r.id+"-"+attempt},body:JSON.stringify({amount:{currency:"EUR",value:amount},description:"Pulafanatics bus — "+(r.family_members?.name||"supporter"),redirectUrl:appUrl.replace(/\/$/,"")+"/betaling?reservatie="+encodeURIComponent(r.id),webhookUrl:url.replace(/\/$/,"")+"/functions/v1/mollie-webhook",metadata:{reservation_id:r.id,user_id:auth.user.id}})});
  const payment=await response.json();if(!response.ok)throw new Error(payment?.detail||"Mollie kon de betaling niet aanmaken.");
  const{error:saveErr}=await admin.from("payments").insert({reservation_id:r.id,user_id:auth.user.id,mollie_payment_id:payment.id,checkout_url:payment._links?.checkout?.href,amount_cents:r.price_cents,status:payment.status==="open"?"open":"review",attempt});
  if(saveErr)throw saveErr;
  await admin.from("reservations").update({payment_status:"pending"}).eq("id",r.id);
  return new Response(JSON.stringify({checkoutUrl:payment._links?.checkout?.href}),{headers});
 }catch(e){return new Response(JSON.stringify({error:e instanceof Error?e.message:"Payment failed"}),{status:400,headers})}
});