import { Link } from 'react-router-dom'
import { Crumb, NextCards, Scene } from '../ui'

const LIST = [
  ['01', '梅子青釉刻花莲瓣纹碗', '三维', '点云 · 单件 ≤ 20 万面', '已完成'],
  ['02', '粉青釉贯耳瓶', '三维', '点云 · 单件 ≤ 20 万面', '已完成'],
  ['03', '拉坯工序全过程', '影像', '4K / 50 Mbps / sRGB', '进行中'],
  ['04', '刻花刀法特写', '影像', '4K 微距 · 固定机位', '进行中'],
  ['05', '梅子青釉色样板', '纹样', '色卡对位 · 矢量重绘', '已完成'],
  ['06', '窑址全景与窑炉内壁', '影像', '全景拼接 · 等距投影', '待采'],
  ['07', '传承人口述（2 位）', '音视频', '需书面授权先行', '待采'],
] as const

const PARAM = [
  ['机身', '全画幅微单 ×2 · 中画幅 ×1'],
  ['镜头', '50mm 定焦 · 100mm 微距'],
  ['视频规格', '4K / 25p / 50 Mbps / sRGB'],
  ['静态规格', '6000×4000 · RAW + JPEG'],
  ['三维方式', '摄影测量 + 结构光补扫'],
  ['命名规则', 'WB-ZJ-LQ-0009-{类型}-{序号}'],
  ['存储', '双卡备份 + 现场 SSD 冷备'],
]

export default function Capture() {
  return (
    <div className="scroll">
      <div className="phead">
        <Crumb items={[['总览', '/'], ['采集']]} />
        <h1>采集工作台</h1>
        <p className="lead">一次采集任务的完整链路：登记 → 采集 → 校验 → 入库。每一件入库素材均可回溯至采集人、设备与授权文件。</p>
        <Scene>用于在现场统一采集口径、元数据填写与入库校验标准。</Scene>
      </div>

      <div className="rsum" style={{ borderTop: '1px solid var(--line)' }}>
        <span>任务编号 <b>WB-CJ-20261118-07</b></span>
        <span>关联项目 <b>龙泉青瓷烧制技艺 Ⅷ-9</b></span>
        <span>采集地 <b>浙江省龙泉市</b></span>
        <span>计划 <b>4 天</b></span>
        <span>现场 <b>6 人</b></span>
      </div>

      <div className="chain" style={{ paddingTop: 18 }}>
        <div className="step done"><div className="k">01 登记</div><div className="t">已完成</div><div className="v">26 项已登记</div></div>
        <div className="step cur"><div className="k">02 采集</div><div className="t">进行中 · 3 / 26</div><div className="v">今日完成 2 项</div></div>
        <div className="step"><div className="k">03 校验</div><div className="t">待开始</div><div className="v">入库前三查</div></div>
        <div className="step"><div className="k">04 入库</div><div className="t">待开始</div><div className="v">写入资产库并登记</div></div>
      </div>

      <div className="dgrid" style={{ marginTop: 8 }}>
        <div>
          <h2 className="sec" style={{ padding: '22px 0 10px' }}><span>本批次采集清单</span><em>26 项 · 已完成 3 · 此处节选 7 项</em></h2>
          <table className="tbl">
            <colgroup><col style={{ width: 40 }} /><col /><col style={{ width: 62 }} /><col style={{ width: 176 }} /><col style={{ width: 70 }} /></colgroup>
            <thead><tr><th>序</th><th>采集对象</th><th>类型</th><th>规格要求</th><th>状态</th></tr></thead>
            <tbody>
              {LIST.map(r => (
                <tr key={r[0]}>
                  <td style={{ color: 'var(--ink3)' }}>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td>
                  <td style={{ color: 'var(--ink3)' }}>{r[3]}</td>
                  <td>{r[4] === '已完成' ? <span className="st-ok"><span className="dot" />已完成</span>
                    : r[4] === '进行中' ? <span className="st-warn"><span className="dot" />进行中</span>
                      : <span className="st-todo"><span className="dot" />待采</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ borderLeft: '2px solid var(--dai)', padding: '10px 0 10px 14px', margin: '16px 0 0', fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.9 }}>
            <b>第 07 项须先取得书面授权后拍摄，不得先拍后补。</b>口述影像涉及肖像权与个人隐私；未获授权者仅在档案中登记数量，不纳入素材库。
            <div style={{ fontSize: 11.5, color: 'var(--ink3)', marginTop: 6 }}>尊重非遗形式与内涵见《非物质文化遗产法》第五条；肖像与个人隐私见《民法典》人格权编</div>
          </div>
        </div>

        <div>
          <h2 className="sec" style={{ padding: '22px 0 10px' }}><span>采集参数</span><em>本任务锁定</em></h2>
          <table className="meta">
            <tbody>{PARAM.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody>
          </table>
          <p className="srcnote">参数按《非物质文化遗产数字化采集规范》填写，入库前必查三项：分辨率与码率、色彩与色卡对位、元数据完整性。</p>
        </div>
      </div>

      <NextCards items={[
        { l: '下一步', n: '采集完成后，素材变成什么 · 资产库', to: '/assets' },
        { l: '也可回看', n: '这些项目是怎么被选进来的 · 名录', to: '/projects' },
      ]} />
    </div>
  )
}
