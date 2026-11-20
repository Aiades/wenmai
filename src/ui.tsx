import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NATIONAL, PLATFORM } from './data/stats'

/* ---------------- 左导航 ---------------- */
const NAV = [
  ['/', '总览', 'overview', <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>],
  ['/projects', '名录', 'projects', <><path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5" /></>],
  ['/inheritors', '传承人', 'inheritors', <><circle cx="12" cy="8" r="3.4" /><path d="M5 20c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4" /></>],
  ['/capture', '采集', 'capture', <><path d="M3 8h4l1.6-2h6.8L17 8h4v11H3z" /><circle cx="12" cy="13.2" r="3.2" /></>],
  ['/assets', '资产', 'assets', <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>],
  ['/public', '公众', 'public', <><circle cx="12" cy="12" r="8.2" /><path d="M3.8 12h16.4" /><path d="M12 3.8c2.6 2.4 2.6 13.6 0 16.4-2.6-2.8-2.6-14 0-16.4" /></>],
  ['/api', '开放 API', 'api', <><path d="M9 7.5L4.5 12 9 16.5" /><path d="M15 7.5L19.5 12 15 16.5" /><path d="M13.4 4.5l-2.8 15" /></>],
] as const

export function Rail({ active }: { active: string }) {
  return (
    <aside className="rail">
      <div className="logo">文</div>
      <nav>
        {NAV.map(([href, label, key, icon]) => (
          <Link key={key} to={href} className={key === active ? 'on' : ''}>
            <svg viewBox="0 0 24 24">{icon}</svg>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

/* ---------------- 顶栏 ---------------- */
export function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <b>文脉</b>
        <span>国家非物质文化遗产数字档案平台</span>
        <i>｜</i>
        <span>省级部署 · 数据可查可溯源</span>
      </div>
    </header>
  )
}

/* ---------------- 主线步骤带 ---------------- */
export const SPINE = [
  { no: '01', nm: '家底', vl: NATIONAL.projects.toLocaleString(), key: 'overview', to: '/' },
  { no: '02', nm: '建档', vl: String(PLATFORM.filed), key: 'projects', to: '/projects' },
  { no: '03', nm: '入库', vl: PLATFORM.assets.toLocaleString(), key: 'assets', to: '/assets' },
  { no: '04', nm: '可查', vl: String(PLATFORM.filed), key: 'public', to: '/public' },
]

export function Spine({ active }: { active?: string }) {
  const loc = useLocation()
  const cur = active || (
    loc.pathname.startsWith('/projects') || loc.pathname.startsWith('/project/') ? 'projects' :
    loc.pathname.startsWith('/inheritors') ? 'inheritors' :
    loc.pathname.startsWith('/capture') ? 'capture' :
    loc.pathname.startsWith('/assets') ? 'assets' :
    loc.pathname.startsWith('/api') ? 'api' :
    loc.pathname.startsWith('/public') ? 'public' : 'overview')
  return (
    <div className="spine">
      {SPINE.map(s => (
        <Link key={s.key} to={s.to} className={s.key === cur ? 'on' : ''}>
          <span className="no">{s.no}</span>
          <span className="nm">{s.nm}</span>
          <span className="vl">{s.vl}</span>
        </Link>
      ))}
    </div>
  )
}

/* ---------------- 灯箱 ---------------- */
type LB = { open: (src: string, cap?: string) => void }
const LBContext = createContext<LB>({ open: () => {} })
export const useLightbox = () => useContext(LBContext)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [st, setSt] = useState<{ src: string; cap?: string } | null>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSt(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <LBContext.Provider value={{ open: (src, cap) => setSt({ src, cap }) }}>
      {children}
      {st && (
        <div className="lb on" onClick={() => setSt(null)}>
          <img src={st.src} alt="" />
          <div className="lb-cap">{st.cap}</div>
        </div>
      )}
    </LBContext.Provider>
  )
}

/* ---------------- 小组件 ---------------- */
export function Crumb({ items }: { items: [string, string?][] }) {
  return (
    <div className="crumb">
      {items.map(([label, to], i) => (
        <span key={i}>
          {i > 0 && ' › '}
          {to ? <Link to={to}>{label}</Link> : label}
        </span>
      ))}
    </div>
  )
}

export function Chips({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="chips">
      {items.map(v => (
        <button key={v} className={'chip' + (v === value ? ' on' : '')} onClick={() => onChange(v)}>{v}</button>
      ))}
    </div>
  )
}

export function Pager({ page, pages, onGo }: { page: number; pages: number; onGo: (p: number) => void }) {
  const list: number[] = []
  for (let i = 1; i <= pages; i++) list.push(i)
  return (
    <div className="pager">
      <a className={page <= 1 ? 'off' : ''} onClick={() => page > 1 && onGo(page - 1)}>‹</a>
      {list.map(i => <a key={i} className={i === page ? 'on' : ''} onClick={() => onGo(i)}>{i}</a>)}
      <a className={page >= pages ? 'off' : ''} onClick={() => page < pages && onGo(page + 1)}>›</a>
    </div>
  )
}

export function NextCards({ items }: { items: { l: string; n: string; to: string }[] }) {
  return (
    <div className="next">
      {items.map(it => (
        <Link key={it.to} to={it.to}>
          <span><span className="l">{it.l}</span><span className="n">{it.n}</span></span>
          <span className="ar">→</span>
        </Link>
      ))}
    </div>
  )
}

export function Thumb({ img, alt }: { img?: string; alt?: string }) {
  const lb = useLightbox()
  if (!img) return <div className="thumb-ph"><span>{(alt || '遗').replace(/^[ⅧⅠⅡⅢⅣⅤⅥⅦⅨⅩ\-\d\s]+/, '').slice(0, 1)}</span></div>
  const src = `./media/${img}.jpg`
  return <img className="thumb-img" src={src} alt={alt || ''} onClick={e => { e.stopPropagation(); lb.open(src, alt) }} style={{ cursor: 'zoom-in' }} />
}

/* ---------------- 场景说明 ---------------- */
export function Scene({ children }: { children: string }) {
  return (
    <p className="scene">
      <span>使用场景</span>
      {children}
    </p>
  )
}
