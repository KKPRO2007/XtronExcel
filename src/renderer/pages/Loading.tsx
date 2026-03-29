import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PHASES = ['Initializing AI modules...', 'Loading neural networks...', 'Connecting Excel engine...', 'Preparing workspace...', 'Almost ready...']
const CHECKS = ['AI Engine', 'Excel Parser', 'Neural Net', 'File System', 'Voice Module', 'Workspace']

export default function Loading() {
  const nav = useNavigate()
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)
  const [ready, setReady] = useState<boolean[]>(Array(CHECKS.length).fill(false))
  const [done, setDone] = useState(false)
  const [cells, setCells] = useState<number[]>(Array(120).fill(0))

  useEffect(() => {
    const ci = setInterval(() => {
      setCells(prev => {
        const next = [...prev]
        for (let i = 0; i < 4; i++) {
          const idx = Math.floor(Math.random() * 120)
          next[idx] = Math.random() > 0.5 ? 1 : 0
        }
        return next
      })
    }, 80)

    let p = 0
    const pi = setInterval(() => {
      p += Math.random() * 2.8 + 0.5
      if (p >= 100) {
        p = 100; clearInterval(pi)
        setTimeout(() => setDone(true), 300)
        setTimeout(() => nav('/get-started'), 750)
      }
      setProgress(Math.min(p, 100))
      setPhase(Math.min(Math.floor((p / 100) * PHASES.length), PHASES.length - 1))
      setReady(prev => {
        const next = [...prev]
        const thr = 100 / CHECKS.length
        for (let i = 0; i < CHECKS.length; i++) { if (p > thr * (i + 1)) next[i] = true }
        return next
      })
    }, 55)
    return () => { clearInterval(ci); clearInterval(pi) }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: done ? 'opacity 0.4s ease' : undefined, opacity: done ? 0 : 1 }}>
      <style>{`
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes glitch { 0%,85%,100%{clip-path:none;transform:none} 87%{clip-path:polygon(0 20%,100% 20%,100% 40%,0 40%);transform:translate(-3px,0)} 89%{clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%);transform:translate(3px,0)} 91%{clip-path:none;transform:none} }
        @keyframes check-in { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        .loading-glitch { animation: glitch 6s infinite; }
      `}</style>

      {/* BG grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(10, 1fr)' }}>
        {cells.map((v, i) => (
          <div key={i} style={{ border: '1px solid', borderColor: v ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.025)', background: v ? 'rgba(59,130,246,0.04)' : 'transparent', transition: 'all 0.4s ease' }}/>
        ))}
      </div>

      {/* Scanline */}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 2, pointerEvents: 'none', zIndex: 50, background: 'linear-gradient(180deg,transparent,rgba(59,130,246,0.15),transparent)', animation: 'scan 3.5s linear infinite' }}/>

      {/* Corner brackets */}
      {[{top:20,left:20},{top:20,right:20},{bottom:20,left:20},{bottom:20,right:20}].map((pos, i) => {
        const isR = 'right' in pos, isB = 'bottom' in pos
        return <div key={i} style={{ position:'absolute', width:20, height:20, borderTop:isB?'none':'1px solid rgba(59,130,246,0.35)', borderBottom:isB?'1px solid rgba(59,130,246,0.35)':'none', borderLeft:isR?'none':'1px solid rgba(59,130,246,0.35)', borderRight:isR?'1px solid rgba(59,130,246,0.35)':'none', ...pos as any }}/>
      })}

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, zIndex: 10 }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-glitch" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: -2, color: '#f5f5f5' }}>GPT</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: -2, background: '#3b82f6', color: '#fff', padding: '2px 14px' }}>EXCEL</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 10, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 6, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
            AI Spreadsheet Intelligence · Datum_GLAU
          </div>
        </div>

        <div style={{ width: 320 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, color: 'rgba(255,255,255,0.3)' }}>{PHASES[phase]}</span>
            <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: '#3b82f6', letterSpacing: 1 }}>{String(Math.floor(progress)).padStart(3, '0')}%</span>
          </div>
          <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', borderRadius: 1 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', transition: 'width 0.05s linear', boxShadow: '0 0 12px rgba(59,130,246,0.7)' }}/>
          </div>
          <div style={{ display: 'flex', gap: 3, marginTop: 10 }}>
            {Array(24).fill(0).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 2, background: (i / 24) * 100 <= progress ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.08)', transition: 'background 0.15s ease', transitionDelay: `${i * 0.015}s`, borderRadius: 1 }}/>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 48px' }}>
          {CHECKS.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1.5, textTransform: 'uppercase', color: ready[i] ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.15)', transition: 'color 0.4s ease', animation: ready[i] ? 'check-in 0.3s ease' : undefined }}>
              <div style={{ width: 5, height: 5, flexShrink: 0, background: ready[i] ? '#3b82f6' : 'rgba(255,255,255,0.1)', boxShadow: ready[i] ? '0 0 8px rgba(59,130,246,0.8)' : 'none', transition: 'all 0.4s ease' }}/>
              {label}
              {ready[i] && <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 8, color: '#3b82f6' }}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 28px', fontSize: 9, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 2, color: 'rgba(255,255,255,0.15)' }}>
        <span>v2.0.0</span><span>ELECTRON · REACT · TYPESCRIPT · PYTHON</span><span>© 2026 GPT-EXCEL</span>
      </div>
    </div>
  )
}