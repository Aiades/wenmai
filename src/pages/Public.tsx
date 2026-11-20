import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { PLATFORM } from '../data/stats'
import { Crumb, useLightbox, Scene } from '../ui'

const SHOW = PROJECTS.filter(p => p.img).slice(0, 12)

export default function Public() {
  const lb = useLightbox()
  return (
    <div className="scroll">
      <div className="phead" style={{ paddingBottom: 8 }}>
        <Crumb items={[['总览', '/'], ['公众端']]} />
        <h1 style={{ fontSize: 30, lineHeight: 1.35 }}>让每一件器物<br />都有据可查</h1>
        <p className="lead" style={{ maxWidth: 620, marginTop: 12 }}>
          本页收录已完成数字化采集与建档的文化遗产。每一幅影像均可追溯至采集时间、地点、设备与授权状态。
        </p>
        <Scene>用于向社会公开已完成建档的项目与影像，并标注来源与权利状态。</Scene>
      </div>

      <div style={{ display: 'flex', gap: 54, padding: '14px 34px 8px' }}>
        {[[276, '已建档项目'], [PLATFORM.assets, '数字资产'], [145, '覆盖县区']].map(([v, l]) => (
          <div key={l as string}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 27, color: 'var(--dai)' }}>{(v as number).toLocaleString()}</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink3)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <h2 className="sec"><span>项目图鉴</span><em>点击查看大图 · 再点一次进入档案</em></h2>
      <div className="cards">
        {SHOW.map(p => (
          <div className="card" key={p.code} style={{ cursor: 'default' }}>
            <div className="ph" style={{ height: 168, cursor: 'zoom-in' }}
              onClick={() => lb.open(`./media/${p.img}.jpg`, `${p.name} · ${p.region}`)}>
              <img src={`./media/${p.img}.jpg`} alt={p.name} />
            </div>
            <div className="tx">
              <div className="nm">{p.name}</div>
              <div className="su">{p.region} · {p.code}</div>
              <Link to={`/project/${encodeURIComponent(p.code)}`} style={{ fontSize: 11.5, color: 'var(--dai)', display: 'inline-block', marginTop: 6 }}>查看档案 →</Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '6px 34px 40px', fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.9 }}>
        本页影像为同类器物的公开参考文献影像，来源见 media/SOURCES.md。确权与登记仅及于数字化采集形成的数字资产，不涉及非物质文化遗产本体权属；项目名录按国务院公布的国家级代表性项目名录收录。
      </div>
    </div>
  )
}
