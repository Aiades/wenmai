import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { PLATFORM } from '../data/stats'
import { Chips, Crumb, NextCards, Pager, Thumb, Scene } from '../ui'

const PER = 12
const TYPE = ['三维', '影像', '纹样', '文献']

const DEF = [
  ['A-017', '三维', 'Ⅷ-9', '梅子青釉刻花莲瓣纹碗 · 点云', 'lq-3', '点云 · 19.6 万面', '已确权'],
  ['IMG-042', '影像', 'Ⅷ-9', '碗心刻花特写', 'lq-4', '4K / 50Mbps / sRGB', '已确权'],
  ['VEC-011', '纹样', 'Ⅷ-9', '莲瓣纹矢量图', 'lq-1', '矢量重绘 · 600dpi', '已确权'],
  ['A-021', '三维', 'Ⅷ-9', '粉青釉贯耳瓶 · 点云', 'lq-2', '点云 · 18.2 万面', '复核中'],
  ['IMG-055', '影像', 'Ⅷ-9', '拉坯工序全景', 'lq-2', '4K / 25p', '已确权'],
  ['DOC-007', '文献', 'Ⅷ-9', '龙泉窑址调查记（1982 手稿）', 'paper-1', '600dpi · PDF/A', '已确权'],
  ['IMG-018', '影像', 'Ⅷ-13', '云锦妆花缎匹料', 'brocade-1', '4K / 50Mbps', '已确权'],
  ['VEC-004', '纹样', 'Ⅷ-13', '妆花缠枝莲纹样', 'silk-3', '矢量重绘', '已确权'],
  ['DOC-005', '文献', 'Ⅷ-13', '云锦纹样谱（清末抄本）', 'paper-2', '600dpi · PDF/A', '已确权'],
  ['IMG-031', '影像', 'Ⅷ-1', '紫砂朱泥提梁壶', 'yixing-1', '4K / 50Mbps', '已确权'],
  ['IMG-032', '影像', 'Ⅷ-1', '紫砂树桩笔筒', 'yixing-2', '4K / 50Mbps', '复核中'],
  ['VEC-009', '纹样', 'Ⅷ-15', '缂丝花鸟纹样', 'kesi-1', '矢量重绘 · 600dpi', '已确权'],
  ['IMG-044', '影像', 'Ⅷ-7', '青花缠枝莲纹罐', 'blue-1', '4K / 50Mbps', '已确权'],
  ['IMG-045', '影像', 'Ⅷ-7', '青花人物纹瓶', 'blue-2', '4K / 50Mbps', '待采集'],
  ['IMG-052', '影像', 'Ⅷ-11', '德化白瓷观音坐像', 'dehua-1', '4K / 50Mbps', '已确权'],
  ['VEC-017', '纹样', 'Ⅷ-24', '蓝印花布缠枝纹', 'indigo-1', '矢量重绘', '已确权'],
  ['DOC-011', '文献', 'Ⅷ-65', '宣纸抄造工序记录', 'paper-1', '600dpi · PDF/A', '已确权'],
  ['IMG-061', '影像', 'Ⅷ-3', '石湾陶塑人物（参考）', 'ganqi-1', '4K / 50Mbps', '复核中'],
] as const

export default function Assets() {
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const rows = useMemo(() => DEF.filter(r => !type || r[1] === type), [type])
  const pages = Math.max(1, Math.ceil(rows.length / PER))
  const cur = Math.min(page, pages)
  const slice = rows.slice((cur - 1) * PER, cur * PER)

  return (
    <div className="scroll">
      <div className="phead">
        <Crumb items={[['总览', '/'], ['资产库']]} />
        <h1>资产库</h1>
        <p className="lead">每一件入库的数字资产均具有唯一编号、采集记录与确权状态。确权登记的对象为采集形成的数字资产，不涉及技艺本体。</p>
        <Scene>用于确认单件资产的来源、规格与权利范围，判断其可否对外许可及许可边界。</Scene>
      </div>

      <div className="filters">
        <div className="frow">
          <span className="flabel">类型</span>
          <Chips items={['全部', ...TYPE]} value={type || '全部'} onChange={v => { setType(v === '全部' ? '' : v); setPage(1) }} />
          <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--ink3)' }}>
            全库 {PLATFORM.assets.toLocaleString()} 项 · 已确权 1,612 · 复核中 92 · 待采集 20
          </span>
        </div>
      </div>

      <div className="rsum">
        <span>筛选 <b>{rows.length}</b> 项<i className="sample">抽样展示 · 全库 {PLATFORM.assets.toLocaleString()} 项</i></span>
        <span>已确权 <b>{rows.filter(r => r[6] === '已确权').length}</b></span>
        <span>覆盖项目 <b>{new Set(rows.map(r => r[2])).size}</b> 个</span>
      </div>

      <div className="tblwrap">
        <table className="tbl thumb">
          <colgroup><col style={{ width: 56 }} /><col style={{ width: 96 }} /><col /><col style={{ width: 60 }} /><col style={{ width: 210 }} /><col style={{ width: 160 }} /><col style={{ width: 84 }} /></colgroup>
          <thead><tr><th></th><th>资产编号</th><th>名称</th><th>类型</th><th>所属项目</th><th>规格</th><th>确权</th></tr></thead>
          <tbody>
            {slice.map(r => {
              const p = PROJECTS.find(x => x.code === r[2])
              return (
                <tr key={r[0]}>
                  <td><Thumb img={r[4]} alt={r[3]} /></td>
                  <td style={{ color: 'var(--ink3)', fontSize: 12 }}>{r[0]}</td>
                  <td>{r[3]}</td>
                  <td>{r[1]}</td>
                  <td><Link to={`/project/${encodeURIComponent(r[2])}`}>{p?.name || r[2]}</Link></td>
                  <td style={{ color: 'var(--ink3)' }}>{r[5]}</td>
                  <td>{r[6] === '已确权' ? <span className="st-ok"><span className="dot" />已确权</span>
                    : r[6] === '复核中' ? <span className="st-warn"><span className="dot" />复核中</span>
                      : <span className="st-todo"><span className="dot" />待采集</span>}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pager page={cur} pages={pages} onGo={setPage} />

      <NextCards items={[
        { l: '下一步', n: '这些资产怎么交给国家库 · 汇交', to: '/submit' },
        { l: '也可回看', n: '资产是在哪一步被采集的 · 采集工作台', to: '/capture' },
      ]} />
    </div>
  )
}
