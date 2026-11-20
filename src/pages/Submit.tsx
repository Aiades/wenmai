import { Link } from 'react-router-dom'
import { NATIONAL, PLATFORM } from '../data/stats'
import { Crumb, NextCards } from '../ui'

const Q = [['2026 Q1', 42, 42], ['2026 Q2', 58, 58], ['2026 Q3', 61, 61], ['2026 Q4（在办）', 37, 0]] as const

const FIELDS = [
  ['档案编号', 'WB-0006', '与本平台资产编号一一对应'],
  ['项目编号', 'Ⅷ-9', '国务院公布名录编号'],
  ['项目名称', '龙泉青瓷烧制技艺', '与名录原文一致'],
  ['申报地区', '浙江省龙泉市', '行政区划代码一并提交'],
  ['保护单位', '龙泉市非物质文化遗产保护中心', '统一社会信用代码'],
  ['资产清单', '104 项', '含类型、规格、采集日期'],
  ['权利状态', '已确权 / 已登记', '不含未取得授权的影像'],
  ['资源类型', '影像 / 点云 / 纹样 / 文献', '按国家库数据字典映射'],
]

export default function Submit() {
  return (
    <div className="scroll">
      <div className="phead">
        <Crumb items={[['总览', '/'], ['汇交']]} />
        <h1>向国家大数据库汇交</h1>
        <p className="lead">
          《文化遗产保护传承"十五五"规划》提出在中国文物云、非遗数据库基础上<strong>统合形成国家文化遗产资源大数据库</strong>。
          本平台按省级部署，把已建档的数字资产按统一字段汇交上去，这是整个平台的出口。
        </p>
      </div>

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="kpi"><div className="lab">已汇交</div><div className="val">{PLATFORM.submitted}<small>项</small></div><div className="sub">占已建档 {Math.round(PLATFORM.submitted / PLATFORM.filed * 100)}%</div></div>
        <div className="kpi"><div className="lab">待汇交</div><div className="val">{PLATFORM.filed - PLATFORM.submitted}<small>项</small></div><div className="sub">Q4 批次在办</div></div>
        <div className="kpi"><div className="lab">最近一次同步</div><div className="val" style={{ fontSize: 24 }}>{PLATFORM.submittedAt}</div><div className="sub">全量 198 项 · 校验通过</div></div>
        <div className="kpi"><div className="lab">全国目标库</div><div className="val">{NATIONAL.projects.toLocaleString()}<small>项</small></div><div className="sub">子项 {NATIONAL.subitems.toLocaleString()} 个</div></div>
      </div>

      <h2 className="sec"><span>四个批次</span><em>按季汇交 · 每批全量校验</em></h2>
      <div style={{ padding: '0 34px 4px' }}>
        {Q.map(([q, n, done]) => (
          <div className="covrow" key={q} style={{ gridTemplateColumns: '150px 1fr 120px' }}>
            <span className="nm">{q}</span>
            <span className="track"><i style={{ width: `${n / 61 * 100}%`, background: done ? 'var(--shilv)' : 'var(--line-2)' }} /></span>
            <span className="val" style={{ textAlign: 'right' }}>
              {n} 项 {done ? <span className="st-ok" style={{ marginLeft: 8 }}><span className="dot" />已通过</span> : <span className="st-warn" style={{ marginLeft: 8 }}><span className="dot" />在办</span>}
            </span>
          </div>
        ))}
      </div>

      <div className="dgrid" style={{ marginTop: 18 }}>
        <div>
          <h2 className="sec" style={{ padding: '0 0 10px' }}><span>汇交包字段</span><em>与国家库数据字典对齐</em></h2>
          <table className="tbl">
            <colgroup><col style={{ width: 110 }} /><col style={{ width: 220 }} /><col /></colgroup>
            <thead><tr><th>字段</th><th>示例</th><th>说明</th></tr></thead>
            <tbody>
              {FIELDS.map(f => (
                <tr key={f[0]}><td>{f[0]}</td><td style={{ color: 'var(--ink)' }}>{f[1]}</td><td style={{ color: 'var(--ink3)' }}>{f[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="sec" style={{ padding: '0 0 10px' }}><span>一个真实的汇交包</span><em>JSON · 已脱敏</em></h2>
          <pre style={{
            background: 'var(--card)', border: '1px solid var(--line)', padding: '14px 16px',
            fontSize: 11.5, lineHeight: 1.85, color: 'var(--ink2)', overflow: 'auto', fontFamily: 'ui-monospace,Menlo,monospace'
          }}>{`{
  "archiveNo": "WB-0006",
  "project": {
    "code": "Ⅷ-9",
    "name": "龙泉青瓷烧制技艺",
    "batch": "第一批",
    "year": 2006,
    "region": "浙江省龙泉市",
    "unit": "龙泉市非物质文化遗产保护中心"
  },
  "assets": [
    { "id":"WB-ZJ-LQ-0009-A-017",
      "type":"三维",
      "spec":"点云 19.6 万面",
      "right":"已确权 · 已登记",
      "date":"2026-10-02" }
  ],
  "count": 104,
  "submittedAt": "2026-11-12T09:20:00+08:00"
}`}</pre>
          <p className="srcnote">未取得授权的影像不进汇交包；确权登记仅及于数字资产，不涉及技艺本体。</p>
        </div>
      </div>

      <NextCards items={[
        { l: '下一步', n: '汇交之后对外怎么呈现 · 公众端', to: '/public' },
        { l: '也可回看', n: '这些数据是从哪一步来的 · 采集工作台', to: '/capture' },
      ]} />
    </div>
  )
}
