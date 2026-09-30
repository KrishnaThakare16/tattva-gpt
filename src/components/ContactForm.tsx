import { useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { phone, whatsapp } from '../utils/config';
type Form = {name:string,phone:string,email:string,requirement:string};
const empty:Form={name:'',phone:'',email:'',requirement:''};
export function ContactForm(){const [form,setForm]=useState<Form>(empty);const [attempted,setAttempted]=useState(false);const [status,setStatus]=useState('');const [sending,setSending]=useState(false);const pending=useRef(false);const [honey,setHoney]=useState('');const errors={name:form.name.trim().length<2?'Please enter your name.':'',phone:/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g,''))?'':'Enter a valid 10-digit Indian mobile number.',email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())?'':'Enter a valid email address.',requirement:form.requirement.trim().length>=10?'':'Tell us a little more (at least 10 characters).'};const valid=Object.values(errors).every(v=>!v);const update=(key:keyof Form,value:string)=>{setForm(f=>({...f,[key]:value}));setStatus('')};const submit=async(e:React.FormEvent)=>{
 e.preventDefault();if(pending.current)return;setAttempted(true);
 if(!valid){setStatus('Please check the highlighted fields.');return;}
 if(honey)return;
 pending.current=true;setSending(true);setStatus('Sending your inquiry…');
 const controller=new AbortController();const timer=window.setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch('https://formsubmit.co/ajax/landemandar61@gmail.com',{
   method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},signal:controller.signal,
   body:JSON.stringify({name:form.name.trim(),phone:form.phone.trim(),email:form.email.trim(),requirement:form.requirement.trim(),_replyto:form.email.trim(),_subject:'New Tattva website inquiry',_template:'table',_honey:honey,_url:window.location.origin})
  });
  const result=await response.json();
  if(!response.ok || !(result.success===true || result.success==='true'))throw new Error('Submission rejected');
  if(/activat|confirm.*email|verify/i.test(result.message||'')){
   setStatus('Email delivery is awaiting confirmation by our team. Please use WhatsApp Now for this inquiry.');
  }else{
   setStatus('Thank you. Your inquiry has been submitted. We’ll be in touch soon.');setForm(empty);setAttempted(false);
  }
 }catch{
  setStatus('We could not confirm submission. Your details are still here. Please try again or use WhatsApp Now.');
 }finally{window.clearTimeout(timer);pending.current=false;setSending(false);}
};return <form className="contact-form" onSubmit={submit} aria-busy={sending} noValidate><input type="text" name="_honey" value={honey} onChange={e=>setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{display:"none"}}/><div className="form-row">{(['name','phone'] as const).map(k=><label key={k}>{k==='name'?'Name':'Phone'}<input name={k} disabled={sending} maxLength={k==='name'?120:20} value={form[k]} onChange={e=>update(k,e.target.value)} onBlur={()=>{}} autoComplete={k==='name'?'name':'tel'} inputMode={k==='phone'?'tel':undefined} placeholder={k==='name'?'Your name':'Your phone number'} aria-invalid={attempted&&!!errors[k]} aria-describedby={attempted&&errors[k]?`${k}-error`:undefined}/>{attempted&&errors[k]&&<small id={`${k}-error`} className="field-error">{errors[k]}</small>}</label>)}</div><label>Email<input name="email" disabled={sending} maxLength={254} type="email" value={form.email} onChange={e=>update('email',e.target.value)} autoComplete="email" placeholder="you@company.com" aria-invalid={attempted&&!!errors.email} aria-describedby={attempted&&errors.email?'email-error':undefined}/>{attempted&&errors.email&&<small id="email-error" className="field-error">{errors.email}</small>}</label><label>Requirement<textarea name="requirement" disabled={sending} maxLength={5000} rows={4} value={form.requirement} onChange={e=>update('requirement',e.target.value)} placeholder="Tell us about your campaign, location and timeline" aria-invalid={attempted&&!!errors.requirement} aria-describedby={attempted&&errors.requirement?'requirement-error':undefined}/>{attempted&&errors.requirement&&<small id="requirement-error" className="field-error">{errors.requirement}</small>}</label><div className="form-actions"><button className="button button-gold" type="submit" disabled={sending}>{sending?'Sending…':'Submit Inquiry'} <ArrowUpRight size={18}/></button><a className="button button-outline" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> WhatsApp Now</a></div><p className="form-status" role="status">{status||`Prefer a call? +91 ${phone}`}</p></form>}
