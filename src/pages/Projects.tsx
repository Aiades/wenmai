import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { INHERITORS } from '../data/inheritors'
import { Chips, Crumb, NextCards, Pager, Thumb, Scene } from '../ui'

const PER = 12
const BATCH = ['第一批', '第二批', '第三批', '第四批', '第五批']
const STAT = ['已建档', '复核中', '待补全']

export default function Projects() {
  const nav = useNavigate()
  const [sp, setSp] = useSearchParams()
  const prov = sp.get('prov') || ''
  const [batch, setBatch] = useState('')
  const [stat, setStat] = useState('')
  const [kw, setKw] = useState('')
  const [page, setPage] = useState(1)

  const rows = useMemo(() => PROJECTS.map((p, i) => ({
    ...p,
    inh: INHERITORS[p.code]?.list.length || 0,
    submitted: p.status === '已建档' && i % 7 !== 3,
  })).filter(p =>
    (!prov || p.region.includes(prov.replace(/(省|市|自治区|特别行政区)$/, ''))) &&
    (!batch || p.batch === batch) && (!stat || p.status === stat) &&
    (!kw || (p.name + p.code + p.region + p.unit).includes(kw))
  ), [prov, batch, stat, kw])

  const pages = Math.max(1, Math.ceil(rows.length / PER))
  const cur = Math.min(page, pages)
  const slice = rows.slice((cur - 1) * PER, cur * PER)

  return (
    <div className="scroll">
      <div className="phead">
        <Crumb items={[['总览', '/'], ['项目名录']]} />
        <h1>项目名录</h1>
        <p className="lead">依据国务院公布的国家级非物质文化遗产代表性项目名录建档。点击任一项目可进入档案页，查看其从采集、建档到入库、可查的完整流程。</p>
        <Scene>用于按门类与批次核定普查优先级，并确定下一批采集任务的对象范围。</Scene>
      </div>

      <div className="filters">
        <div className="frow">
          <span className="flabel">批次</span>
          <Chips items={['全部', ...BATCH]} value={batch || '全部'} onChange={v => { setBatch(v === '全部' ? '' : v); setPage(1) }} />
          <span className="flabel" style={{ marginLeft: 10 }}>状态</span>
          <Chips items={['全部', ...STAT]} value={stat || '全部'} onChange={v => { setStat(v === '全部' ? '' : v); setPage(1) }} />
          <div className="search" style={{ marginLeft: 'auto' }}>
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" /></svg>
            <input value={kw} onChange={e => { setKw(e.target.value.trim()); setPage(1) }} placeholder="项目名称 / 编号 / 申报地区 / 保护单位" />
          </div>
        </div>
      </div>

      <div className="rsum">
        <span>筛选 <b>{rows.length}</b> 项<i className="sample">名录为抽样展示 · 全库 276 项</i></span>
        <span>已建档 <b>{rows.filter(r => r.status === '已建档').length}</b></span>
        <span>可查 <b>{rows.filter(r => r.submitted).length}</b></span>
        <span>资产 <b>{rows.reduce((a, b) => a + b.assets, 0).toLocaleString()}</b> 项</span>
        {prov && <span className="sp">省份 {prov}
          <a onClick={() => { sp.delete('prov'); setSp(sp) }} style={{ color: 'var(--dai)', marginLeft: 8, cursor: 'pointer' }}>清除</a></span>}
      </div>

      <div className="tblwrap">
        <table className="tbl thumb">
          <colgroup>
            <col style={{ width: 56 }} /><col style={{ width: 76 }} /><col /><col style={{ width: 88 }} />
            <col style={{ width: 118 }} /><col style={{ width: 190 }} /><col style={{ width: 66 }} />
            <col style={{ width: 60 }} /><col style={{ width: 84 }} /><col style={{ width: 20 }} />
          </colgroup>
          <thead><tr>
            <th></th><th>编号</th><th>项目名称</th><th>批次</th><th>申报地区</th><th>保护单位</th>
            <th style={{ textAlign: 'right' }}>传承人</th><th style={{ textAlign: 'right' }}>资产</th>
            <th>状态</th><th></th>
          </tr></thead>
          <tbody>
            {slice.map(p => (
              <tr key={p.code} style={{cursor:'pointer'}} onClick={(e) => { if ((e.target as HTMLElement).closest('a,img')) return; nav(`/project/${encodeURIComponent(p.code)}`) }}>
                <td><Thumb img={p.img} alt={p.name} /></td>
                <td style={{ color: 'var(--ink3)' }}>{p.code}</td>
                <td className="nmcell"><Link to={`/project/${encodeURIComponent(p.code)}`} >{p.name}</Link></td>
                <td style={{ color: 'var(--ink3)' }}>{p.batch}</td>
                <td>{p.region}</td>
                <td style={{ color: 'var(--ink3)' }}>{p.unit}</td>
                <td className="num">{p.inh || '—'}</td>
                <td className="num">{p.assets}</td>
                <td>{p.status === '已建档' ? <span className="st-ok"><span className="dot" />已建档</span>
                  : p.status === '复核中' ? <span className="st-warn"><span className="dot" />复核中</span>
                    : <span className="st-todo"><span className="dot" />待补全</span>}</td>
                <td className="chev"><Link to={`/project/${encodeURIComponent(p.code)}`}>›</Link></td>
              </tr>
            ))}
            {!slice.length && <tr><td colSpan={10} style={{ padding: '48px 0', textAlign: 'center', color: 'var(--ink3)' }}>
              没有符合条件的项目 · <a onClick={() => { setKw(''); setBatch(''); setStat(''); sp.delete('prov'); setSp(sp) }} style={{ color: 'var(--dai)', cursor: 'pointer' }}>清除筛选</a>
            </td></tr>}
          </tbody>
        </table>
      </div>

      <Pager page={cur} pages={pages} onGo={p => { setPage(p); window.scrollTo({ top: 0 }) }} />

      <NextCards items={[
        { l: '下一步', n: '这些项目背后是谁在做 · 看传承人', to: '/inheritors' },
        { l: '也可以直接看', n: '开放 API 能取到哪些数据', to: '/api' },
      ]} />
    </div>
  )
}
