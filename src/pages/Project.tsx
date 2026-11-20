import { useParams, Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { INHERITORS } from '../data/inheritors'
import RightsChain, { type ChainNode } from '../Chain'
import { Crumb, NextCards, useLightbox, Scene } from '../ui'

const GAL: Record<string, string[]> = {
  'Ⅷ-9': ['lq-3', 'lq-1', 'lq-4', 'lq-2'],
  'Ⅷ-1': ['yixing-1', 'yixing-2'],
  'Ⅷ-7': ['blue-1', 'blue-2'],
  'Ⅷ-13': ['brocade-1', 'silk-1', 'silk-3'],
  'Ⅷ-15': ['kesi-1', 'kesi-2'],
  'Ⅷ-8': ['cizhou-1', 'cizhou-2'],
  'Ⅷ-10': ['cizhou-1', 'cizhou-2'],
  'Ⅷ-11': ['dehua-1', 'dehua-2'],
  'Ⅷ-24': ['indigo-1', 'indigo-2'],
  'Ⅷ-25': ['indigo-1'],
  'Ⅷ-65': ['paper-1', 'paper-2'],
  'Ⅷ-72': ['brush-1'],
  'Ⅷ-73': ['brush-1', 'lacquer-2'],
  'Ⅷ-88': ['kite-2', 'fan-1'],
  'Ⅷ-3': ['ganqi-1'],
}
const CAP = ['采集主图', '纹样与工序', '同类器参考', '细节']


const CHAIN: ChainNode[] = [
  {
    k: '01', t: '名录公布', s: '国家级代表性项目', state: 'done',
    detail: [['名录编号', 'Ⅷ-9 · 名录序号 359'], ['批次', '第一批 · 2006 年公布'], ['公布单位', '国务院'], ['申报地区', '浙江省龙泉市']],
  },
  {
    k: '02', t: '保护单位', s: '法定保护责任主体', state: 'done',
    detail: [['保护单位', '龙泉市非物质文化遗产保护中心'], ['统一社会信用代码', '已核验'], ['人类非遗', '2009 年列入 UNESCO 代表作名录'], ['传承人', '国家级 3 人（徐朝兴、毛正聪、张绍斌）']],
  },
  {
    k: '03', t: '采集授权', s: '影像与口述的取得依据', state: 'done',
    detail: [['授权文件', '馆藏数字化授权书 WB-AUTH-2026-014'], ['授权范围', '数字化采集、存档、公开展示'], ['签署日期', '2026-09-12'], ['例外', '传承人肖像与口述另签个人授权']],
  },
  {
    k: '04', t: '数字资产', s: '可核验的登记对象', state: 'doing',
    detail: [['已登记', '104 项（影像 38 / 纹样 30 / 三维 16 / 文献 20）'], ['确权状态', '38 项已完成登记，4 项复核中'], ['采集批次', 'WB-CJ-20261118-07'], ['存证方式', '内容哈希 + 时间戳，平台内可核验']],
    asset: [['影像', '38 项 · 4K 与 6000×4000 静态'], ['纹样', '30 项 · 矢量重绘，色卡对位'], ['三维', '16 项 · 点云与网格，单件 ≤ 20 万面'], ['文献', '20 项 · 600dpi 扫描，PDF/A']],
    time: [['采集', '2026-09-12 至 2026-09-28'], ['入库', '2026-10-02'], ['复核', '2026-10-16 起，4 项在办'], ['登记', '2026-11-16']],
  },
  {
    k: '05', t: '可许可范围', s: '对外使用的边界', state: 'todo',
    detail: [['可许可', '复制权、信息网络传播权（限非独占、中国大陆）'], ['不可许可', '改编权、商用再许可、训练数据许可（须另议）'], ['当前状态', '未对外授权，可申请'], ['定价依据', '同类器物可比成交区间，须逐笔核定']],
  },
]

export default function Project() {
  const { code = '' } = useParams()
  const p = PROJECTS.find(x => x.code === decodeURIComponent(code))
  const lb = useLightbox()

  if (!p) return (
    <div className="scroll">
      <div className="phead"><Crumb items={[['总览', '/'], ['项目名录', '/projects'], ['未找到']]} />
        <h1>未找到该项目</h1>
        <p className="lead">编号 <b>{code}</b> 不在当前名录里。<Link to="/projects" style={{ color: 'var(--dai)' }}>返回项目名录 →</Link></p>
        <Scene>用于查证单个项目的建档完整性、资产构成与权利状态，作为立项与验收的依据。</Scene>
      </div>
    </div>
  )

  const gal = (GAL[p.code] || (p.img ? [p.img] : [])).slice(0, 4)
  const people = INHERITORS[p.code]?.list || []
  const idx = PROJECTS.findIndex(x => x.code === p.code)
  const submitted = idx < 18

  return (
    <div className="scroll">
      <div className="phead">
        <Crumb items={[['总览', '/'], ['项目名录', '/projects'], [p.name]]} />
        <h1>{p.name} <span style={{ fontSize: 12, color: 'var(--ink3)', marginLeft: 10, fontFamily: 'var(--sans)' }}>{p.code}</span></h1>
        <div className="tags" style={{ marginTop: 10 }}>
          <span className="tag">传统技艺</span><span className="tag">{p.batch}</span><span className="tag">{p.region}</span>
          {p.unesco && <span className="tag hi">联合国教科文组织人类非遗代表作</span>}
        </div>
      </div>

      <div className="dgrid">
        <div>
          <div className="plate">
            {gal[0] ? <img src={`./media/${gal[0]}.jpg`} alt={p.name} onClick={() => lb.open(`./media/${gal[0]}.jpg`, `${p.name} · ${CAP[0]}`)} /> : <div className="thumb-ph" style={{ width: '100%', height: '100%' }}>暂无影像</div>}
            <div className="tag">图版 01 · 参考影像</div>
            <div className="cap">4 : 3 · 同类器物参考文献影像</div>
          </div>
          <div className="thumbs">
            {gal.slice(1).map((g, i) => (
              <figure key={g} onClick={() => lb.open(`./media/${g}.jpg`, `${p.name} · ${CAP[i + 1]}`)} style={{ cursor: 'zoom-in' }}>
                <img src={`./media/${g}.jpg`} alt="" />
                <figcaption>{CAP[i + 1]}</figcaption>
              </figure>
            ))}
          </div>
          <p className="srcnote">本页影像为同类器物的公开参考文献影像，来源见 <a href="./media/SOURCES.md" style={{ color: 'var(--dai)' }}>media/SOURCES.md</a>，用于说明版式与信息结构，非本项目采集图。正式部署时由采集端补齐主图与拍摄参数。</p>
        </div>

        <div>
          <table className="meta">
            <tbody>
              <tr><th>项目编号</th><td>{p.code}<small>名录序号见名录原文</small></td></tr>
              <tr><th>类别</th><td>传统技艺</td></tr>
              <tr><th>批次</th><td>{p.batch} · 2006 年公布</td></tr>
              <tr><th>申报地区</th><td>{p.region}</td></tr>
              <tr><th>保护单位</th><td>{p.unit}</td></tr>
              <tr><th>人类非遗</th><td>{p.unesco ? '已列入 UNESCO 代表作名录' : '未列入'}</td></tr>
              <tr><th>已建档资产</th><td><Link to="/assets" style={{ color: 'var(--dai)' }}>{p.assets} 项</Link></td></tr>
              <tr><th>确权登记</th><td>已登记{submitted ? ' · 已对外开放' : ''}</td></tr>
            </tbody>
          </table>

          {people.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <div style={{ fontSize: 11.5, color: 'var(--ink3)', letterSpacing: '.08em', marginBottom: 9 }}>国家级代表性传承人 · {people.length} 人</div>
              {people.map(x => (
                <div className={`person${x.status === '已故' ? ' dead' : ''}`} key={x.name} style={{ marginBottom: 8 }}>
                  <div className="av">{x.name.slice(0, 1)}</div>
                  <div>
                    <div className="nm">{x.name}{x.status && <span style={{ fontSize: 11, color: 'var(--ink3)', marginLeft: 7 }}>{x.status}</span>}</div>
                    <div className="mt">{x.gender} · {x.birth ? `${x.birth} 年生` : '生年未载'} · {x.batch}</div>
                    <div className="mt"><a href={x.source} target="_blank" rel="noreferrer">中国非遗网传承人档案 ↗</a></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <h2 className="sec"><span>项目简介</span><em>据公开资料整理</em></h2>
      <div className="prose" style={{ paddingBottom: 6 }}>{p.intro || '（暂无简介）'}</div>

      <h2 className="sec"><span>权利链</span><em>从名录公布到可许可，五个环节，点击查看依据</em></h2>
      <RightsChain nodes={CHAIN} />

      <h2 className="sec"><span>这个项目的数字化进度</span><em>采集 → 建档 → 入库 → 可查</em></h2>
      <div className="chain">
        <div className="step done"><div className="k">01 采集</div><div className="t">已完成</div><div className="v">{Math.round(p.assets * 1.6)} 条素材 · 6 人 · 4 天</div></div>
        <div className="step done"><div className="k">02 建档</div><div className="t">已完成</div><div className="v">{p.assets} 项资产入库</div></div>
        <div className="step cur"><div className="k">03 可查</div><div className="t">{submitted ? '已开放' : '待开放'}</div><div className="v">{submitted ? '2026-11-12 起对外可查' : '等待批次开放'}</div></div>
        <div className="step"><div className="k">04 可查</div><div className="t">{submitted ? '已开放' : '未开放'}</div><div className="v">公众端可见</div></div>
      </div>

      <NextCards items={[
        { l: '下一步', n: `看这个项目产生了哪些资产（${p.assets} 项）`, to: '/assets' },
        { l: '也可以看', n: '同期其他项目的建档情况', to: '/projects' },
      ]} />
    </div>
  )
}
