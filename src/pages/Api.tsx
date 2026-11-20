import { PLATFORM } from '../data/stats'
import { PROJECTS } from '../data/projects'
import { Crumb, NextCards, Scene } from '../ui'

const CHANNEL = [
  ['向上报送', '上级业务主管部门', '按上级规定的字段与周期，报送已建档项目与资产清单', '定期'],
  ['向下接入', '市、县级文化单位', '接入其已建档案与影像，避免重复采集', '按批次'],
  ['自有采集', '平台采集端', '现场采集的影像、点云与口述记录，入库后自动进入通道', '实时'],
]

const SERVICE = [
  ['适用对象', '文创企业、展陈机构、研究机构与开发者。企业用户按年度开通，可指定成员及用途。'],
  ['使用方式', '按用途申请授权。授权限定资源类别与使用期限，所取用的资产均记录使用去向。'],
  ['计费方式', '企业用户按授权期限与调用量计费。研究及非营利用途单独核定，不按调用量计费。'],
]

const FLOW = [
  ['提交申请', '说明用途与所需数据类别，平台审核后开通测试权限。'],
  ['对接联调', '取少量项目试取，核对字段口径与调用方式。'],
  ['正式开通', '签订授权协议，开通正式权限并纳入调用记录。'],
]

export default function Api() {
  const demo = PROJECTS.find(p => p.code === 'Ⅷ-9')

  return (
    <div className="scroll">
      <div className="phead">
        <Crumb items={[['总览', '/'], ['开放 API']]} />
        <h1>开放 API</h1>
        <p className="lead">
          平台对外提供两类通道：一类与上下级单位对接，实现数据报送与接入；一类面向企业用户，
          在授权范围内提供数据调用服务。
        </p>
        <Scene>用于向上下级单位报送与接入数据，并向企业用户提供授权范围内的调用。</Scene>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="lab">已接入地区</div>
          <div className="val">{PLATFORM.provinces}<small>个省级</small></div>
          <div className="sub">向下接入市、县级已建档案</div>
        </div>
        <div className="kpi">
          <div className="lab">已报送项目</div>
          <div className="val">{PLATFORM.submitted}<small>项</small></div>
          <div className="sub">按上级口径整理后报送</div>
        </div>
        <div className="kpi">
          <div className="lab">可调用项目</div>
          <div className="val">{PLATFORM.filed}<small>条</small></div>
          <div className="sub">覆盖 {PLATFORM.provinces} 个省级行政区</div>
        </div>
        <div className="kpi">
          <div className="lab">可调用数字资产</div>
          <div className="val">{PLATFORM.assets.toLocaleString()}<small>条</small></div>
          <div className="sub">影像 / 纹样 / 三维 / 文献四类</div>
        </div>
      </div>

      <h2 className="sec"><span>数据通道</span><em>三个方向</em></h2>
      <div className="tblwrap" style={{ paddingBottom: 0 }}>
        <table className="tbl">
          <colgroup><col width="140" /><col width="200" /><col /><col width="90" /></colgroup>
          <thead><tr><th>方向</th><th>对接对象</th><th>内容</th><th style={{ textAlign: 'right' }}>频率</th></tr></thead>
          <tbody>
            {CHANNEL.map(([a, b, c, d]) => (
              <tr key={a}><td><b>{a}</b></td><td>{b}</td><td>{c}</td><td className="num">{d}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="sec"><span>对外服务</span><em>面向企业用户</em></h2>
      <div className="grid3">
        {SERVICE.map(([t, d]) => (
          <div className="cardp" key={t}>
            <b>{t}</b>
            <p>{d}</p>
          </div>
        ))}
      </div>

      <h2 className="sec"><span>调用返回内容</span><em>以龙泉青瓷为例</em></h2>
      <div className="samplewrap">
        <table className="meta sample">
          <tbody>
            <tr><th>项目档案</th><td>Ⅷ-9 龙泉青瓷烧制技艺 · 第一批 · 浙江省龙泉市 · 龙泉市非物质文化遗产保护中心</td></tr>
            <tr><th>传承人</th><td>徐朝兴、毛正聪、张绍斌（已故）</td></tr>
            <tr><th>资产清单</th><td>104 项（影像 38 / 纹样 30 / 三维 16 / 文献 20），仅给编号与规格</td></tr>
            <tr><th>权利状态</th><td>已确权登记，可申请商用授权；原图按编号另行提取</td></tr>
          </tbody>
        </table>
        <div className="samplenote">
          <p>返回的内容是档案本身，不含影像文件。原图按资产编号另行提取，由平台核对授权范围后发放，确保每一份素材的去向可查。</p>
        </div>
      </div>

      <h2 className="sec"><span>接入流程</span><em>三步</em></h2>
      <div className="steps4">
        {FLOW.map(([t, v], i) => (
          <div className="st4" key={t}>
            <div className="k">{String(i + 1).padStart(2, '0')}</div>
            <div className="t">{t}</div>
            <div className="v">{v}</div>
          </div>
        ))}
      </div>

      <p className="pnote" style={{ margin: '14px 34px 0' }}>
        通道仅承担数据的接入与导出，不改动下级单位的原始档案；企业用户的调用均在授权范围内进行。
        {demo ? `示例字段与「${demo.name}」档案页同源。` : ''}
      </p>

      <NextCards items={[
        { l: '这些数据是怎么采到的', n: '看一次采集任务的四步与入库三查', to: '/capture' },
        { l: '权利状态是怎么来的', n: '看一个项目的档案与传承人', to: `/project/${encodeURIComponent('Ⅷ-9')}` },
      ]} />
    </div>
  )
}
