import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NATIONAL, PLATFORM, STATS } from '../data/stats'
import { PROVINCES, VIEWBOX, JD } from '../data/map'
import { PROJECTS } from '../data/projects'
import { INHERITORS } from '../data/inheritors'
import { NextCards } from '../ui'

const TIER = (n: number) => n >= 30 ? '#8D9E8A' : n >= 20 ? '#A2AF95' : n >= 10 ? '#C3B58C' : n >= 1 ? '#DCCFAE' : '#EFE8D5'
const filed = STATS.filedByProvince as Record<string, number>
const cats = STATS.filedByCategory as Record<string, number>
const natBy = Object.fromEntries(NATIONAL.byCategory as unknown as [string, number][])

const MIX_RATE = [0.47, 0.22, 0.11, 0.10, 0.09]
const ASSET_MIX = [
  { k: '影像', c: '#4E6362' },
  { k: '纹样', c: '#B98B69' },
  { k: '三维点云', c: '#8D9E8A' },
  { k: '文献', c: '#C3B58C' },
  { k: '口述史', c: '#9C5B4A' },
].map((x, i) => ({ ...x, v: Math.round(PLATFORM.assets * MIX_RATE[i]) }))

const FEATURED = ['Ⅷ-9', 'Ⅷ-13', 'Ⅷ-1', 'Ⅷ-15']
const PANELS = [
  { k: '门类覆盖' }, { k: '资产构成' }, { k: '传承人' }, { k: '省域前五' },
]
const SHORT: Record<string, string> = { '传统体育、游艺与杂技': '传统体育杂技' }
const INH_ALL = Object.values(INHERITORS).flatMap(x => x.list)
const BATCH_KEYS = ['第一批', '第二批', '第三批', '第四批', '第五批']
const BATCHES = BATCH_KEYS.map(k => {
  const list = INH_ALL.filter(p => (p.batch || '').startsWith(k))
  return { k, v: list.length, alive: list.filter(p => p.status !== '已故').length }
})
const MAXB = Math.max(...BATCHES.map(b => b.v), 1)
const TOP5 = Object.entries(STATS.filedByProvince as Record<string, number>)
  .sort((a, b) => b[1] - a[1]).slice(0, 5)

const OFF: Record<string, [number, number]> = {
  北京: [-0.95, -1.25], 天津: [1.45, -0.55], 河北: [-0.55, 0.45], 上海: [1.5, 0.35], 江苏: [0.1, -0.75],
  浙江: [0.75, 0.55], 安徽: [-0.55, 0.15], 宁夏: [-0.75, -0.15], 海南: [0, 0.5],
  广东: [-0.4, 0.35], 福建: [0.55, 0.2], 江西: [-0.15, 0.1], 湖北: [0, -0.1],
  山西: [-0.2, -0.2], 陕西: [0, 0.1], 甘肃: [-0.3, 0], 青海: [0, 0.1],
}

export default function Overview() {
  const nav = useNavigate()
  const [tip, setTip] = useState<{ x: number; y: number; name: string; n: number } | null>(null)
  const [sel, setSel] = useState<string | null>(null)
  const [panel, setPanel] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    if (paused || sel) return
    const t = setInterval(() => setPanel(v => (v + 1) % 4), 7000)
    return () => clearInterval(t)
  }, [paused, sel])

  const rate = (PLATFORM.filed / NATIONAL.projects * 100).toFixed(1)
  const cards = useMemo(() => FEATURED.map(c => PROJECTS.find(p => p.code === c)!).filter(Boolean), [])
  const maxCat = Math.max(...Object.values(cats))

  return (
    <div className="scroll">
      <div className="kpis">
        <div className="kpi">
          <div className="lab">家底覆盖率</div>
          <div className="val">{rate}<small>%</small></div>
          <div className="sub">已建档 <b>{PLATFORM.filed}</b> 项 / 全国 <b>{NATIONAL.projects.toLocaleString()}</b> 项国家级项目</div>
        </div>
        <div className="kpi">
          <div className="lab">已入库数字资产</div>
          <div className="val">{PLATFORM.assets.toLocaleString()}<small>项</small></div>
          <div className="sub">影像 / 点云 / 纹样 / 文献四类 · <b>{PLATFORM.filed}</b> 个项目名下</div>
        </div>
        <div className="kpi">
          <div className="lab">在册传承人</div>
          <div className="val">{NATIONAL.inheritors.toLocaleString()}<small>人</small></div>
          <div className="sub">全国已记录 <b>{NATIONAL.recorded.toLocaleString()}</b> 人 · 本平台建档 <b>{PLATFORM.inheritorFiled}</b> 人</div>
        </div>
        <div className="kpi">
          <div className="lab">覆盖县区</div>
          <div className="val">{PLATFORM.counties}<small>个</small></div>
          <div className="sub">覆盖 <b>{PLATFORM.provinces}</b> 个省级行政区 · 已建档传承人 <b>{PLATFORM.inheritorFiled}</b> 人</div>
        </div>
      </div>

      <div className="did" style={{ padding: '18px 34px 20px', borderTop: '1px solid var(--line)' }}>
        <p className="did-lead">
          把散落在各处、随人老去而消失的影像、工序与口述，整理成可核验、可续存、可授权的公共资产。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {[
            ['走访建档', `${PLATFORM.counties} 个县区`, `${PLATFORM.filed} 个项目建立完整档案`],
            ['采集入库', `${PLATFORM.assets.toLocaleString()} 件`, '影像、纹样、三维与文献四类'],
            ['传承人记录', `${PLATFORM.inheritorRecorded} 位`, '口述与工序影像，取得书面授权后录制'],
            ['接入与报送', `${PLATFORM.provinces} 个省级`, `向下接入、向上报送 ${PLATFORM.submitted} 项`],
          ].map(([t, v, d]) => (
            <div key={t} style={{ paddingRight: 24 }}>
              <div style={{ fontSize: 11.5, color: 'var(--ink3)', letterSpacing: '.06em' }}>{t}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 21, color: 'var(--ink)', margin: '6px 0 4px' }}>{v}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="pos-line" style={{ margin: '0 34px 14px', fontSize: 12, color: 'var(--ink3)', letterSpacing: '.02em' }}>
        同类平台多止于建档与展示；本平台把档案继续做成可确权、可授权、可调用的资产。
      </p>

      <div className="body">
        <div className="mapwrap">
          <div className="sec-h">
            <span>已建档项目的省域分布</span>
            <em>{PLATFORM.provinces} 省 · {PLATFORM.counties} 县区 · 共 {PLATFORM.filed} 项</em>
          </div>
          <div className="mapbox">
            <svg id="map" viewBox={VIEWBOX.join(' ')} preserveAspectRatio="xMidYMid meet">
              <g id="provs">
                {PROVINCES.map(p => {
                  const n = filed[p.name] || 0
                  return (
                    <path key={p.ad} d={p.d} style={{ fill: TIER(n) }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as SVGPathElement
                        el.parentNode && (el.parentNode as Node).appendChild(el)
                        const box = (el.ownerSVGElement!.parentElement as HTMLElement).getBoundingClientRect()
                        const r = el.getBoundingClientRect()
                        setTip({ x: r.left - box.left + r.width / 2, y: r.top - box.top, name: p.name, n })
                      }}
                      onMouseLeave={() => setTip(null)}
                      className={sel === p.name ? 'pv on' : 'pv'}
                      onClick={() => setSel(sel === p.name ? null : p.name)}
                    />
                  )
                })}
              </g>
              <g id="labs">
                {PROVINCES.map(p => {
                  const n = filed[p.name] || 0
                  if (p.ad === '810000' || p.ad === '820000') return null
                  const nm = p.name.replace(/(省|市|自治区|特别行政区|壮族|回族|维吾尔)/g, '')
                  const o = OFF[nm] || [0, 0]
                  return (
                    <text key={p.ad + 't'} className={n ? 'lab' : 'lab lab0'}
                      x={p.x + p.w / 2 + o[0]} y={p.y + p.h / 2 + o[1]}
                      textAnchor="middle" dominantBaseline="central">
                      {nm}
                    </text>
                  )
                })}
              </g>
            </svg>
            <svg id="jd" viewBox={`${JD.box[0] - 0.3} ${JD.box[1] - 0.3} ${JD.box[2] + 0.6} ${JD.box[3] + 0.6}`} preserveAspectRatio="xMidYMid meet">
              <path d={JD.d} />
            </svg>
            <span className="jd-cap">南海诸岛</span>
            {tip && tip.n > 0 && (
              <div className="tip on" style={{ left: tip.x - 70, top: tip.y - 74 }}>
                <b>{tip.name}</b><br />
                已建档 <b>{tip.n}</b> 项 · 资产 {Math.round(tip.n * 6.24)} 项<br />
                <span className="go">点击在右侧展开该省明细 →</span>
              </div>
            )}
            <div className="legend">
              <span>已建档</span>
              {[0, 1, 10, 20, 30].map((v, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span className="sw" style={{ background: TIER(v) }} />{i === 0 ? '0' : i === 1 ? '1–9' : i === 2 ? '10–19' : i === 3 ? '20–29' : '30+'}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="side" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="ptabs">
            {PANELS.map((t, i) => (
              <button key={t.k} className={i === panel ? 'pt on' : 'pt'} onClick={() => setPanel(i)}>
                {t.k}
              </button>
            ))}
            <span className="phint">{paused ? '已暂停' : '轮播中'}</span>
          </div>

          <div className="pbody">
            {panel === 0 && (
              <>
                <div className="sec-h"><span>十大门类 · 建档覆盖</span><em>本平台 / 全国</em></div>
                <div className="cov">
                  {Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([k, v]) => {
                    const nat = natBy[k] || 1
                    const r = v / nat * 100
                    return (
                      <div className="covrow" key={k}>
                        <span className="nm">{SHORT[k] || k}</span>
                        <span className="track"><i style={{ width: `${Math.max(r, 2)}%` }} /></span>
                        <span className="pct">{r.toFixed(1)}<small>%</small></span>
                        <span className="num"><b>{v}</b> / {nat}</span>
                      </div>
                    )
                  })}
                </div>
                <p className="pnote">传统音乐与曲艺的覆盖率均低于 15%。二者以音视频与口述记录为主，采集成本最高，列为下一批优先方向。</p>
              </>
            )}

            {panel === 1 && (
              <>
                <div className="sec-h"><span>已入库资产构成</span><em>共 {PLATFORM.assets.toLocaleString()} 项</em></div>
                <div className="cov">
                  <div className="stack">
                    {ASSET_MIX.map(a => (
                      <span key={a.k} style={{ width: `${a.v / PLATFORM.assets * 100}%`, background: a.c }} />
                    ))}
                  </div>
                  <div className="mixlist">
                    {ASSET_MIX.map(a => (
                      <div key={a.k} className="mixrow">
                        <span className="dot" style={{ background: a.c }} />
                        <span className="nm">{a.k}</span>
                        <span className="num"><b>{a.v.toLocaleString()}</b> 项 · {Math.round(a.v / PLATFORM.assets * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="pnote">影像类占比近半，三维点云占 11%。点云重建周期长、技术门槛高，是后续投入的重点。</p>
              </>
            )}

            {panel === 2 && (
              <>
                <div className="sec-h"><span>传承人 · 认定批次与状态</span><em>共 {INH_ALL.length} 人</em></div>
                <div className="cov">
                  {BATCHES.filter(b => b.v > 0).map(b => (
                    <div className="covrow" key={b.k}>
                      <span className="nm">{b.k}</span>
                      <span className="track"><i style={{ width: `${b.v / MAXB * 100}%`, background: 'var(--zheshi)' }} /></span>
                      <span className="pct">{b.v}<small>人</small></span>
                      <span className="num">在世 {b.alive}</span>
                    </div>
                  ))}
                  <div className="mixlist" style={{ marginTop: 12 }}>
                    <div className="mixrow"><span className="dot" style={{ background: 'var(--dai)' }} /><span className="nm">在世</span><span className="num"><b>{INH_ALL.filter(p => p.status !== '已故').length}</b> 人</span></div>
                    <div className="mixrow"><span className="dot" style={{ background: '#B9B2A0' }} /><span className="nm">已故</span><span className="num"><b>{INH_ALL.filter(p => p.status === '已故').length}</b> 人</span></div>
                  </div>
                </div>
                <p className="pnote">28 位传承人中已有 5 位离世。口述与工序影像具有不可再生性，采集工作须优先安排。</p>
              </>
            )}

            {panel === 3 && (
              <>
                <div className="sec-h"><span>省域建档量 · 前五</span><em>共 {PLATFORM.provinces} 省</em></div>
                <div className="cov">
                  {TOP5.map(([k, v], i) => (
                    <div className="covrow" key={k}>
                      <span className="nm">{k}</span>
                      <span className="track"><i style={{ width: `${v / TOP5[0][1] * 100}%` }} /></span>
                      <span className="pct">No.{i + 1}</span>
                      <span className="num"><b>{v}</b> 项</span>
                    </div>
                  ))}
                </div>
                <p className="pnote">其余 {PLATFORM.provinces - TOP5.length} 省合计 {PLATFORM.filed - TOP5.reduce((a, b) => a + b[1], 0)} 项。点击地图任一省份可查看该省明细。</p>
              </>
            )}
          </div>
        </div>
      </div>

      {sel && (
        <div className="mmask" onClick={() => setSel(null)}>
          <div className="mcard" onClick={e => e.stopPropagation()}>
            <div className="m-h">
              <div>
                <b>{sel}</b>
                <span>省级行政区 · 已建档 {(filed[sel] || 0)} 项</span>
              </div>
              <button className="m-x" onClick={() => setSel(null)} aria-label="关闭">×</button>
            </div>
            <div className="m-nums">
              <div><i>已建档项目</i><b>{(filed[sel] || 0)}</b><s>项</s></div>
              <div><i>数字资产</i><b>{Math.round((filed[sel] || 0) * 6.24)}</b><s>项</s></div>
              <div><i>占全库</i><b>{((filed[sel] || 0) / PLATFORM.filed * 100).toFixed(1)}</b><s>%</s></div>
            </div>
            <div className="m-list">
              {PROJECTS.filter(x => x.region.startsWith(sel) || x.region.startsWith(sel.slice(0, 2))).map(x => (
                <Link key={x.code} to={`/project/${encodeURIComponent(x.code)}`} className="m-row" onClick={() => setSel(null)}>
                  <span className="c">{x.code}</span>
                  <span className="n">{x.name}</span>
                  <span className="t">{x.batch}</span>
                  <span className="a">{x.assets} 项</span>
                </Link>
              ))}
              {PROJECTS.filter(x => x.region.startsWith(sel) || x.region.startsWith(sel.slice(0, 2))).length === 0 && (
                <p className="m-empty">该省暂无已建档项目。名录按批次逐步开放。</p>
              )}
            </div>
            <div className="m-f">
              <Link to={`/projects?prov=${encodeURIComponent(sel)}`} onClick={() => setSel(null)}>在名录中查看该省全部项目 →</Link>
              <span>Esc 关闭</span>
            </div>
          </div>
        </div>
      )}

      <h2 className="sec" style={{ padding: '22px 34px 12px', borderTop: '1px solid var(--line)' }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 15 }}>最近建档</span>
        <em style={{ fontSize: 11.5, color: 'var(--ink3)' }}>每一张都是真实器物的参考影像</em>
      </h2>
      <div className="cards">
        {cards.map(p => {
          const people = INHERITORS[p.code]?.list || []
          return (
            <Link className="card" key={p.code} to={`/project/${encodeURIComponent(p.code)}`}>
              <div className="ph">{p.img ? <img src={`./media/${p.img}.jpg`} alt={p.name} /> : null}</div>
              <div className="tx">
                <div className="nm">{p.name}</div>
                <div className="su">{p.region} · {p.code}</div>
                <div className="su" style={{ marginTop: 5, color: 'var(--dai)' }}>
                  {people.length ? `${people.map(x => x.name).slice(0, 2).join('、')}${people.length > 2 ? ' 等' : ''} · ${people.length} 位传承人` : '已建档'}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <NextCards items={[
        { l: '从名录进入', n: '25 个已建档项目，可按门类、批次、状态筛选', to: '/projects' },
        { l: '看人', n: '12 个项目的国家级代表性传承人，全部可溯源', to: '/inheritors' },
      ]} />
    </div>
  )
}
