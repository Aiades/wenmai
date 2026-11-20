import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { INHERITORS } from '../data/inheritors'
import { NATIONAL, PLATFORM } from '../data/stats'
import { Crumb, NextCards, Scene } from '../ui'

export default function Inheritors() {
  const [kw, setKw] = useState('')
  const groups = PROJECTS
    .filter(p => INHERITORS[p.code])
    .filter(p => !kw || p.name.includes(kw) || INHERITORS[p.code].list.some(x => x.name.includes(kw)))
  const total = Object.values(INHERITORS).reduce((a, g) => a + g.list.length, 0)

  return (
    <div className="scroll">
      <div className="phead">
        <Crumb items={[['总览', '/'], ['传承人']]} />
        <h1>传承人</h1>
        <p className="lead">非物质文化遗产以传承人为载体。本页收录 {Object.keys(INHERITORS).length} 个项目共 {total} 位国家级代表性传承人，姓名、认定批次与出生年份均引自中国非物质文化遗产网传承人档案，可逐条核验。</p>
        <Scene>用于确定记录优先级，并追踪口述与工序影像的采集进度。</Scene>
      </div>

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="kpi"><div className="lab">全国在册国家级传承人</div><div className="val">{NATIONAL.inheritors.toLocaleString()}<small>人</small></div><div className="sub">五批认定 · 2022 年在世 {NATIONAL.inheritorsAlive.toLocaleString()} 人</div></div>
        <div className="kpi"><div className="lab">已支持记录</div><div className="val">{NATIONAL.recorded.toLocaleString()}<small>人</small></div><div className="sub">占在册 {Math.round(NATIONAL.recorded / NATIONAL.inheritors * 100)}%</div></div>
        <div className="kpi"><div className="lab">本平台建档</div><div className="val">{PLATFORM.inheritorFiled}<small>人</small></div><div className="sub">已记录 {PLATFORM.inheritorRecorded} 人</div></div>
      </div>

      <div className="filters">
        <div className="frow">
          <span className="flabel">检索</span>
          <div className="search" style={{ maxWidth: 320 }}>
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" /></svg>
            <input value={kw} onChange={e => setKw(e.target.value.trim())} placeholder="项目名或传承人姓名" />
          </div>
          <span style={{ fontSize: 11.5, color: 'var(--ink3)' }}>共 {groups.length} 个项目 · {total} 人</span>
        </div>
      </div>

      <div style={{ padding: '14px 34px 0' }}>
        {groups.map(p => (
          <div key={p.code} style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 9 }}>
              <Link to={`/project/${encodeURIComponent(p.code)}`} style={{ fontFamily: 'var(--serif)', fontSize: 14.5, borderBottom: '1px solid var(--line-2)' }}>{p.name}</Link>
              <span style={{ fontSize: 11.5, color: 'var(--ink3)' }}>{p.code} · {p.region}</span>
              <a href={INHERITORS[p.code].source} target="_blank" rel="noreferrer" style={{ fontSize: 11.5, color: 'var(--dai)', marginLeft: 'auto' }}>名录详情 ↗</a>
            </div>
            <div className="grid3">
              {INHERITORS[p.code].list.map(x => (
                <div className={`person${x.status === '已故' ? ' dead' : ''}`} key={x.name}>
                  <div className="av">{x.name.slice(0, 1)}</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="nm">{x.name}{x.status && <span style={{ fontSize: 11, color: 'var(--ink3)', marginLeft: 7 }}>{x.status}</span>}</div>
                    <div className="mt">{x.gender} · {x.birth ? `${x.birth} 年生` : '生年未载'}</div>
                    <div className="mt">{x.batch}</div>
                    <div className="mt"><a href={x.source} target="_blank" rel="noreferrer">档案 ↗</a></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <NextCards items={[
        { l: '下一步', n: '人看完了，看他们留下的东西 · 资产库', to: '/assets' },
        { l: '也可以看', n: '这些档案最终交给了谁 · 汇交', to: '/submit' },
      ]} />
    </div>
  )
}
