import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const STATS = [
  { value: '40M+', label: 'Formulas Generated', color: 'var(--blue)' },
  { value: '1.4M+', label: 'Active Users', color: 'var(--green)' },
  { value: '98%', label: 'Accuracy Rate', color: 'var(--purple)' },
  { value: '< 2s', label: 'Generation Speed', color: 'var(--yellow)' },
]

const FEATURES = [
  { icon: '⊞', title: 'Excel AI Engine', desc: 'Natural language → production-ready Excel files. Formulas, pivot tables, charts, and financial models from a single prompt.', tags: ['VLOOKUP', 'Pivot', 'Charts', 'Macros'], stat: '200+ formula types', color: 'var(--green)' },
  { icon: '◱', title: 'Document Intelligence', desc: 'Generate reports, proposals, contracts, CVs. Multi-doc comparison, summarization, grammar correction, PDF export.', tags: ['Reports', 'Contracts', 'Research', 'CVs'], stat: '50+ templates', color: 'var(--blue)' },
  { icon: '◈', title: 'Smart File Manager', desc: 'AI-powered file categorization with semantic embeddings. Auto-tag, cluster, deduplicate, and intelligently search files.', tags: ['Auto-Tag', 'Search', 'Dedup', 'Cluster'], stat: 'Embedding-based', color: 'var(--purple)' },
  { icon: '⌘', title: 'Workflow Automation', desc: 'Build drag-and-drop automation workflows. Schedule recurring reports, automate email drafts, AI task pipelines.', tags: ['Schedule', 'Automate', 'Tasks', 'AI Pipeline'], stat: 'Drag & drop builder', color: 'var(--orange)' },
  { icon: '◎', title: 'Voice Commands', desc: 'Hands-free with Web Speech API + Whisper. Voice-to-Excel, voice document creation, text-to-speech responses.', tags: ['Whisper', 'TTS', 'Offline', 'Live'], stat: 'Real-time transcription', color: 'var(--teal)' },
  { icon: '◬', title: 'Data Visualization', desc: 'Interactive charts, KPI dashboards, financial analytics, forecasting graphs. 20+ chart types with full customization.', tags: ['Charts', 'KPI', 'Forecast', 'Dashboard'], stat: '20+ chart types', color: 'var(--yellow)' },
  { icon: '◻', title: 'PowerPoint Generator', desc: 'Auto-generate pitch decks, business presentations with charts embedded. Speaker notes, custom themes.', tags: ['Slides', 'Charts', 'Notes', 'Themes'], stat: 'AI-powered decks', color: 'var(--pink)' },
  { icon: '🔌', title: 'Plugin Marketplace', desc: 'Extend GPT-EXCEL with industry-specific plugins. Automation packs, custom integrations, developer SDK.', tags: ['Plugins', 'Extensions', 'SDK', 'Integrations'], stat: '40+ plugins', color: 'var(--blue)' },
  { icon: '☁', title: 'Hybrid Cloud/Offline', desc: 'Firebase auth + cloud sync with local Python processing. Works fully offline for core features. Zero data lock-in.', tags: ['Firebase', 'Offline', 'Sync', 'Python'], stat: 'Hybrid architecture', color: 'var(--teal)' },
]

const FAQS = [
  { q: 'Does it work offline?', a: 'Yes. GPT-EXCEL uses a hybrid architecture. Core Excel generation, file management, and basic voice commands work fully offline using local Python. AI generation requires internet.' },
  { q: 'What AI models does it use?', a: 'Primary: OpenAI GPT-4o. Azure OpenAI for enterprise. Hugging Face for demos. Whisper for voice. Configure your own API keys in Settings for full control.' },
  { q: 'What file formats are supported?', a: 'Excel (.xlsx, .xls, .xlsm), CSV, PDF, Word (.docx), PowerPoint (.pptx), JSON, and plain text. Export to any format from generated content.' },
  { q: 'Is there a free tier?', a: '50 AI generations/month, basic Excel features, file manager. Pro tier ($12/mo) unlocks unlimited generations, all voice features, advanced automation, and priority support.' },
  { q: 'How secure is my data?', a: 'Files processed locally. Only prompts are sent to AI APIs — never raw file contents unless you explicitly upload them. Firebase handles auth securely. No vendor lock-in.' },
  { q: 'Can I use my own API key?', a: 'Yes. Settings → API Keys. Paste your OpenAI, Azure, or Anthropic key. This gives you direct billing control and access to the latest models.' },
]

export default function GetStarted() {
  const nav = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const [activeFeat, setActiveFeat] = useState(0)
  const [dark, setDark] = useState(() => !document.documentElement.classList.contains('light'))

  useEffect(() => { setTimeout(() => setVisible(true), 50); const t = setInterval(() => setActiveFeat(p => (p + 1) % FEATURES.length), 3800); return () => clearInterval(t) }, [])

  const toggleTheme = () => {
    const nd = !dark; setDark(nd)
    if (nd) { document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light') }
    else { document.documentElement.classList.add('light'); document.documentElement.classList.remove('dark') }
    localStorage.setItem('theme', nd ? 'dark' : 'light')
  }

  return (
    <div style={{ height: '100vh', overflowY: 'auto', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)', opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', padding: '0 28px', height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, letterSpacing: -0.5, color: 'var(--text)' }}>GPT</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, background: 'var(--blue)', color: '#fff', padding: '1px 8px', borderRadius: 4 }}>EXCEL</span>
        </div>
        <div style={{ display: 'flex', gap: 2, marginLeft: 28 }}>
          {['Features', 'Pricing', 'Docs', 'About'].map(l => <span key={l} className="nav-link">{l}</span>)}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Powered by Datum_GLAU</span>
          <div style={{ width: 1, height: 14, background: 'var(--border)' }}/>
          <button className="btn btn-icon-sm btn-ghost" onClick={toggleTheme} data-tip={dark ? 'Light mode' : 'Dark mode'}>
            {dark ? (
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={5}/><line x1={12} y1={1} x2={12} y2={3}/><line x1={12} y1={21} x2={12} y2={23}/><line x1={1} y1={12} x2={3} y2={12}/><line x1={21} y1={12} x2={23} y2={12}/><line x1={4.22} y1={4.22} x2={5.64} y2={5.64}/><line x1={18.36} y1={18.36} x2={19.78} y2={19.78}/><line x1={4.22} y1={19.78} x2={5.64} y2={18.36}/><line x1={18.36} y1={5.64} x2={19.78} y2={4.22}/></svg>
            ) : (
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => nav('/auth')} style={{ color: 'var(--text-sec)' }}>Sign in</button>
          <button className="btn btn-primary btn-sm" onClick={() => nav('/auth')}>Get Started →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '80px 0 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.3, maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)' }}/>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, var(--blue-dim) 0%, transparent 70%)', top: -200, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'relative', zIndex: 1, padding: '0 24px', maxWidth: 740 }}>
          <div style={{ marginBottom: 18 }}>
            <span className="badge badge-blue" style={{ fontSize: '0.7rem', letterSpacing: '0.06em', padding: '4px 12px' }}>● NEW &nbsp; AI-Powered Excel v2.0 — Now Live</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.08, marginBottom: 18, color: 'var(--text)' }}>
            AI-Powered Spreadsheet <br/>
            <span style={{ color: 'var(--blue)' }}>Intelligence for Everyone</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-sec)', lineHeight: 1.75, marginBottom: 32, maxWidth: 540, margin: '0 auto 32px' }}>
            GPT-EXCEL combines LLM intelligence with Python automation to generate Excel files, documents, and data visualizations from natural language — in under 2 seconds.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-xl" onClick={() => nav('/auth')}>Start for free →</button>
            <button className="btn btn-outline btn-xl" onClick={() => nav('/dashboard')}>View demo</button>
          </div>
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {['No credit card', '50 free generations/mo', 'Offline capable', 'Open source'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: 'var(--green)' }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--border)' }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ padding: '28px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, letterSpacing: -2, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.03em' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div className="section-label">Features</div>
          <h2 style={{ marginBottom: 8, color: 'var(--text)' }}>Everything you need. Nothing you don't.</h2>
          <p style={{ marginBottom: 40, maxWidth: 500 }}>A complete AI productivity suite built for analysts, developers, and business teams.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`feat-card${activeFeat === i ? ' active' : ''}`} onClick={() => setActiveFeat(i)}>
                <div style={{ width: 36, height: 36, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-3)', marginBottom: 12, border: `1px solid var(--border)`, borderRadius: 8, color: f.color }}>{f.icon}</div>
                <h3 style={{ marginBottom: 6, fontSize: '0.9rem', color: 'var(--text)' }}>{f.title}</h3>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.6, marginBottom: 12, color: 'var(--text-sec)' }}>{f.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                  {f.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: f.color, letterSpacing: '0.05em' }}>→ {f.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div className="section-label">How it works</div>
          <h2 style={{ marginBottom: 40, color: 'var(--text)' }}>Three steps to your spreadsheet</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 20, left: '16.5%', right: '16.5%', height: 1, background: 'var(--border-2)' }}/>
            {[
              { step: '01', title: 'Write your prompt', desc: 'Describe in plain English. "Create a monthly budget tracker with categories, charts, and overspend alerts."' },
              { step: '02', title: 'AI generates code', desc: 'GPT-4o generates Python using openpyxl/pandas. Our engine validates and executes it locally on your machine.' },
              { step: '03', title: 'Preview & export', desc: 'Live preview before downloading. Export as .xlsx, .csv, .pdf, or .docx. Share directly.' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: 40, height: 40, border: '2px solid var(--blue-border)', background: 'var(--blue-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', letterSpacing: '0.05em', fontWeight: 700, borderRadius: 8 }}>{s.step}</div>
                <h3 style={{ marginBottom: 8, fontSize: '0.875rem', color: 'var(--text)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--text-sec)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section style={{ padding: '48px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div className="section-label">Tech Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Electron.js', 'React 18', 'TypeScript', 'Python 3.11', 'FastAPI', 'OpenAI GPT-4o', 'Whisper API', 'OpenPyXL', 'Pandas', 'Firebase', 'Redux Toolkit', 'Monaco Editor', 'Recharts', 'Socket.io', 'SQLite', 'Stripe', 'Electron Builder', 'Vite'].map(t => (
              <span key={t} style={{ padding: '5px 12px', border: '1px solid var(--border)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-sec)', letterSpacing: '0.03em', borderRadius: 4, background: 'var(--surface-2)', transition: 'all var(--tr)', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-border)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue)'; (e.currentTarget as HTMLElement).style.background = 'var(--blue-dim)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-sec)'; (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)' }}
              >{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ textAlign: 'center' }}>Pricing</div>
          <h2 style={{ marginBottom: 8, color: 'var(--text)' }}>Simple, transparent pricing</h2>
          <p style={{ marginBottom: 40 }}>Start free. Upgrade when you need more power.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { name: 'Free', price: '$0', period: '/month', color: 'var(--green)', features: ['50 AI generations/month', 'Basic Excel generation', 'File manager (1 GB)', '3 workflow automations', 'Community support'], btn: 'Get started', btnClass: 'btn-green' },
              { name: 'Pro', price: '$12', period: '/month', color: 'var(--blue)', features: ['Unlimited AI generations', 'All Excel + Document features', 'File manager (50 GB)', 'Unlimited workflows', 'Voice commands (Whisper)', 'Priority support', 'Plugin marketplace access'], btn: 'Start Pro trial', btnClass: 'btn-blue', popular: true },
            ].map((p, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${p.popular ? 'var(--blue-border)' : 'var(--border)'}`, borderRadius: 12, padding: '24px', position: 'relative', textAlign: 'left' }}>
                {p.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)' }}><span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>MOST POPULAR</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: p.color }}>{p.price}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.period}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {p.features.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-sec)' }}>
                      <span style={{ color: p.color, flexShrink: 0 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <button className={`btn ${p.btnClass} w-full`} style={{ justifyContent: 'center' }} onClick={() => nav('/auth')}>{p.btn}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div className="section-label">FAQ</div>
          <h2 style={{ marginBottom: 32, color: 'var(--text)' }}>Common questions</h2>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span style={{ color: 'var(--text)' }}>{f.q}</span>
                <span style={{ color: 'var(--text-muted)', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block', fontSize: 18 }}>+</span>
              </div>
              <div className={`faq-a${openFaq === i ? ' open' : ''}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 28px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="section-label" style={{ marginBottom: 14, textAlign: 'center' }}>Get started today</div>
        <h2 style={{ fontSize: '2rem', marginBottom: 12, letterSpacing: -1, color: 'var(--text)' }}>Build smarter spreadsheets with AI.</h2>
        <p style={{ marginBottom: 32, color: 'var(--text-sec)' }}>50 free generations per month. No credit card required.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn btn-primary btn-xl" onClick={() => nav('/auth')}>Start for free →</button>
          <button className="btn btn-outline btn-xl" onClick={() => nav('/dashboard')}>Skip to dashboard</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: 'var(--text)' }}>GPT</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, background: 'var(--blue)', color: '#fff', padding: '0 6px', borderRadius: 3 }}>EXCEL</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>© 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'Docs', 'GitHub', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color var(--tr)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >{l}</span>
          ))}
        </div>
        <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Powered by Datum_GLAU · 2026</div>
      </footer>
    </div>
  )
}