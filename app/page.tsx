"use client"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { LogIn, LogOut, Download, Search, FileText, ShieldCheck, Building2, Map, Users } from "lucide-react"

type PlanFile = { id:string; title:string; district:string; csj:string; highway:string; letDate:string; version:string; size:string; url:string; tags:string[] }
type User = { id:string; email:string; name?:string; role:"subcontractor" | "admin" }

const LOGO_URL = "https://drive.google.com/uc?export=view&id=10vRKmfFECcIub9fW-S-n5pR09bTntSa3"
const mockPlans: PlanFile[] = [
  { id:"p-001", title:"IH 35 Widening – Plans Set", district:"Austin", csj:"0015-13-200", highway:"IH 35", letDate:"2025-08-07", version:"IFB v1", size:"88 MB", url:"#", tags:["Structures","Roadway","Signals"] },
  { id:"p-002", title:"US 59 (I‑69) Overpass Rehab – Issued for Bid", district:"Houston", csj:"0177-01-145", highway:"US 59", letDate:"2025-10-02", version:"Addendum 1", size:"56 MB", url:"#", tags:["Bridge","Phasing"] }
]

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
function saveSession(user: User | null){ if(user) localStorage.setItem("vr_session_user", JSON.stringify(user)); else localStorage.removeItem("vr_session_user") }
function getSession(): User | null { const raw = localStorage.getItem("vr_session_user"); return raw ? JSON.parse(raw) as User : null }
function mockAuth(email: string): User { return { id: uid(), email, role: email.endsWith("@maciasspecialty.com") ? "admin":"subcontractor", name: email.split("@")[0] } }

function ThemeToggle(){ const [dark,setDark]=useState(false); useEffect(()=>{ document.documentElement.classList.toggle("dark", dark) },[dark]); return <button className="btn btn-outline" onClick={()=>setDark(v=>!v)}>{dark? "Light":"Dark"} mode</button> }

function Header({ onSignIn }:{ onSignIn?:()=>void }){
  return (<header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b dark:bg-neutral-900/70">
    <div className="container py-3 flex items-center gap-4">
      <Image src={LOGO_URL} alt="Macias Logo" width={40} height={40} />
      <div className="font-semibold">Macias Specialty Contracting</div>
      <nav className="ml-auto hidden sm:flex items-center gap-6 text-sm">
        <a className="hover:text-macias" href="https://www.maciasspecialty.com" target="_blank">Website</a>
        <a className="hover:text-macias" href="#features">Features</a>
        <a className="hover:text-macias" href="#contact">Contact</a>
        {onSignIn && <button className="btn btn-primary" onClick={onSignIn}><LogIn className="w-4 h-4"/> Sign in</button>}
        <ThemeToggle />
      </nav>
    </div>
  </header>)
}

function LandingPage({ onStart }:{ onStart:()=>void }){
  const features = [
    { icon: FileText, title: "TxDOT Plan Access", desc: "Browse current releases by district, highway, and CSJ." },
    { icon: ShieldCheck, title: "Secure & Audited", desc: "Per‑user access, expiring links, and download logging." },
    { icon: Users, title: "Built for Subs", desc: "Fast, mobile‑friendly portal for specialty contractors." }
  ]
  return (<div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-macias-light/20 dark:from-neutral-900 dark:to-neutral-900">
    <Header onSignIn={onStart}/>
    <section className="container py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">TxDOT Plans Portal for <span className="text-macias">Macias Specialty</span></h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-300 text-lg">A modern, secure room where subcontractors can view and download project plan sets released by TxDOT.</p>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" onClick={onStart}>Enter Plans Room</button>
          <a className="btn btn-outline" href="https://www.maciasspecialty.com" target="_blank">Visit maciasspecialty.com</a>
        </div>
        <div className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">Access requires a verified work email.</div>
      </div>
      <div className="card">
        <div className="card-h text-sm font-medium">Preview</div>
        <div className="card-c grid sm:grid-cols-2 gap-3">
          {mockPlans.map(p => (<div key={p.id} className="card border-macias/30">
            <div className="card-c pb-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-macias"/><div className="font-medium line-clamp-1">{p.title}</div>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{p.district} · {p.highway}</div>
            </div>
            <div className="card-f">
              <button className="btn btn-outline text-sm"><Download className="w-4 h-4"/>Download</button>
            </div>
          </div>))}
        </div>
      </div>
    </section>

    <section id="features" className="bg-white dark:bg-neutral-900 border-t dark:border-neutral-800">
      <div className="container py-14 grid md:grid-cols-3 gap-6">
        {features.map(f => (<div key={f.title} className="card hover:shadow-md transition-shadow">
          <div className="card-c">
            <div className="p-3 rounded-xl bg-macias-light/60 w-fit mb-2">
              <f.icon className="w-5 h-5 text-macias"/>
            </div>
            <div className="text-lg font-semibold">{f.title}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">{f.desc}</div>
          </div>
        </div>))}
      </div>
    </section>

    <section className="container py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold">Ready to access plan sets?</h2>
      <p className="text-neutral-600 dark:text-neutral-300 mt-2">Use your company email to sign in.</p>
      <button className="btn btn-primary mt-5" onClick={onStart}><LogIn className="w-4 h-4"/> Sign in</button>
    </section>

    <footer id="contact" className="bg-white dark:bg-neutral-900 border-t dark:border-neutral-800">
      <div className="container py-8 flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-2">
          <Image src={LOGO_URL} alt="Macias Logo" width={28} height={28}/>
          <span className="text-sm">© {new Date().getFullYear()} Macias Specialty Contracting LLC</span>
        </div>
        <a className="text-sm hover:text-macias md:ml-auto" href="https://www.maciasspecialty.com" target="_blank">www.maciasspecialty.com</a>
      </div>
    </footer>
  </div>)
}

function SignIn({ onAuthed }:{ onAuthed:(u:User)=>void }){
  const [email,setEmail]=useState("")
  const submit=(e:React.FormEvent)=>{ e.preventDefault(); const u=mockAuth(email.trim().toLowerCase()); saveSession(u); onAuthed(u) }
  return (<div className="min-h-screen grid place-items-center bg-gradient-to-br from-macias-light to-white dark:from-neutral-900 dark:to-neutral-900">
    <div className="card w-full max-w-md border-macias">
      <div className="card-c flex items-center flex-col gap-2">
        <Image src={LOGO_URL} alt="Macias Logo" width={80} height={80}/>
        <div className="text-xl font-semibold text-macias">Macias Specialty Contracting</div>
        <div className="text-sm text-neutral-600 dark:text-neutral-300">Sign in to view TxDOT plan sets</div>
      </div>
      <div className="card-c pt-0">
        <form className="space-y-3" onSubmit={submit}>
          <div className="space-y-1">
            <label className="text-sm">Work email</label>
            <input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/>
          </div>
          <button className="btn btn-primary w-full"><LogIn className="w-4 h-4"/> Continue</button>
        </form>
      </div>
    </div>
  </div>)
}

function PlanCard({ plan }:{ plan:PlanFile }){
  return (<motion.div whileHover={{ y:-2 }} className="group">
    <div className="card hover:shadow-lg transition-shadow">
      <div className="card-c">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-macias"/>
          <div className="font-semibold">{plan.title}</div>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex flex-wrap gap-2">
          <span className="pill">{plan.district} District</span>
          <span className="pill">CSJ {plan.csj}</span>
          <span className="pill">{plan.highway}</span>
          <span className="pill">Let {new Date(plan.letDate).toLocaleDateString()}</span>
          <span className="pill">{plan.version}</span>
          <span className="pill">{plan.size}</span>
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {plan.tags.map(t => <span key={t} className="badge border-neutral-300">{t}</span>)}
        </div>
      </div>
      <div className="card-f flex items-center justify-between">
        <a className="link flex items-center gap-2" href={plan.url} onClick={e=>{ if(plan.url==="#"){ e.preventDefault(); alert("Demo link. Replace with real download URL."); }}}><Download className="w-4 h-4"/>Download plan set</a>
        <div className="opacity-0 group-hover:opacity-100 transition text-xs text-neutral-500">Hover active · Secure link</div>
      </div>
    </div>
  </motion.div>)
}

function Sidebar({ user,onSignOut }:{ user:User, onSignOut:()=>void }){
  return (<aside className="border-r w-64 h-full bg-neutral-50 dark:bg-neutral-900 flex flex-col">
    <div className="card-h flex items-center gap-3">
      <Image src={LOGO_URL} alt="Macias Logo" width={32} height={32}/>
      <div>
        <div className="font-semibold text-macias">Macias Plans Room</div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">Subcontractor Portal</div>
      </div>
    </div>
    <nav className="p-2 space-y-1">
      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"><Building2 className="w-4 h-4"/> Districts</button>
      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"><Map className="w-4 h-4"/> Highways</button>
      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"><Users className="w-4 h-4"/> Members</button>
    </nav>
    <div className="mt-auto card-h">
      <div className="text-sm font-medium truncate">{user.name || user.email}</div>
      <div className="text-xs text-neutral-500 dark:text-neutral-400">{user.role}</div>
      <button className="btn btn-outline mt-2" onClick={onSignOut}><LogOut className="w-4 h-4"/> Sign out</button>
    </div>
  </aside>)
}

function PlansRoom({ user }:{ user:User }){
  const [q,setQ]=useState(""); const [district,setDistrict]=useState("All"); const [sort,setSort]=useState("Newest")
  const districts = useMemo(()=>["All", ...Array.from(new Set(mockPlans.map(p=>p.district)))],[])
  const filtered = useMemo(()=>{
    const text=q.trim().toLowerCase()
    let list=mockPlans.filter(p=>[p.title,p.district,p.csj,p.highway,p.version,p.tags.join(" ")].join(" ").toLowerCase().includes(text))
    if(district!=="All") list=list.filter(p=>p.district===district)
    list.sort((a,b)=> sort==="Newest" ? (+new Date(b.letDate)-+new Date(a.letDate)) : sort==="Oldest" ? (+new Date(a.letDate)-+new Date(b.letDate)) : a.title.localeCompare(b.title))
    return list
  },[q,district,sort])
  return (<div className="h-screen grid grid-cols-[auto,1fr]">
    <Sidebar user={user} onSignOut={()=>{ saveSession(null); location.reload() }} />
    <main className="overflow-auto">
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b dark:bg-neutral-900/70">
        <div className="container py-3 flex items-center gap-2">
          <div className="relative w-full max-w-xl">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"/>
            <input className="input pl-9" placeholder="Search titles, CSJ, districts, tags…" value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <select className="input max-w-[160px]" value={district} onChange={e=>setDistrict(e.target.value)}>{districts.map(d=><option key={d}>{d}</option>)}</select>
          <select className="input max-w-[140px]" value={sort} onChange={e=>setSort(e.target.value)}><option>Newest</option><option>Oldest</option><option>A–Z</option></select>
        </div>
      </div>
      <div className="container py-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p=> <PlanCard key={p.id} plan={p} /> )}
      </div>
    </main>
  </div>)
}

export default function Page(){
  const [mode,setMode]=useState<'landing'|'signin'|'room'>('landing')
  const [user,setUser]=useState<User|null>(null)
  useEffect(()=>{ const u=getSession(); if(u){ setUser(u); setMode('room') } },[])
  if(mode==='landing') return <LandingPage onStart={()=>setMode('signin')} />
  if(mode==='signin' && !user) return <SignIn onAuthed={(u)=>{ setUser(u); setMode('room') }} />
  return <PlansRoom user={user!} />
}
