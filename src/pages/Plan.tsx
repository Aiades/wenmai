import { Link } from 'react-router-dom'
import { NATIONAL, PLATFORM } from '../data/stats'
import { Crumb, NextCards } from '../ui'

const WHY = [
  ['政策已明确', `《文化遗产保护传承"十五五"规划》提出开展第二次全国非物质文化遗产普查，并在现有数据库基础上统合形成国家文化遗产资源大数据库。省域平台是这一体系在地方的组织单元。`],
  ['时间已不多', `国家级代表性传承人 ${NATIONAL.inheritors.toLocaleString()} 人，其中已支持记录 ${NATIONAL.recorded.toLocaleString()} 人。口述与工序影像不可再生，未记录的部分随传承人故去而消失。`],
  ['碎片尚未连通', `项目名录、普查资料、馆藏影像、传承人口述分散在不同单位与不同介质中，标准不一、互不联通，既难以核验，也难以授权使用。`],
]

const BUILD = [
  ['01', '建档', '按国家级名录口径，为每个项目建立唯一档案：编号、批次、申报地区、保护单位、传承人、工艺要点与影像清单。'],
  ['02', '入库', '把影像、纹样、三维与文献整理为可核验的数字资产，逐件登记来源、采集人、采集时间与授权文件。'],
  ['03', '开放', '向上报送、向下接入；在授权范围内向企业用户提供调用，使数据既能支撑管理，也能产生价值。'],
]

const ASKS = [
  ['明确牵头单位', '确定由哪个部门牵头、哪个处室对接，平台的立项与验收才有归口。'],
  ['划定试点范围', '先选定一至两个市州、若干代表性项目开展建档试点，形成可复制的流程与标准。'],
  ['落实年度经费', '普查、采集、建档与运维分年度列支；平台按批次推进，不追求一次性铺开。'],
  ['衔接现有数据', '与已建成的普查资料、馆藏数据对接，避免重复采集与口径冲突。'],
]

export default function Plan() {
  return (
    <div className="scroll">
      <div className="phead">
        <Crumb items={[['方案']]} />
        <h1>省域非物质文化遗产数字档案平台</h1>
        <p className="lead">
          本页说明建设方案：为什么现在要做、要建成什么、分几步走、需要哪些支持。
          平台各页为同一方案的功能样机，用于说明数据形态与工作流程。
        </p>
      </div>

      <h2 className="sec"><span>为什么现在做</span><em>三个前提</em></h2>
      <div className="grid3">
        {WHY.map(([t, d]) => (
          <div className="cardp" key={t}>
            <b>{t}</b>
            <p>{d}</p>
          </div>
        ))}
      </div>

      <h2 className="sec"><span>建成什么</span><em>一条主线</em></h2>
      <div className="steps4">
        {BUILD.map(([k, t, v]) => (
          <div className="st4" key={k}>
            <div className="k">{k}</div>
            <div className="t">{t}</div>
            <div className="v">{v}</div>
          </div>
        ))}
      </div>

      <h2 className="sec"><span>规模参照</span><em>以全国口径为分母</em></h2>
      <div className="tblwrap" style={{ paddingBottom: 0 }}>
        <table className="tbl">
          <colgroup><col width="200" /><col width="150" /><col /></colgroup>
          <thead><tr><th>指标</th><th style={{ textAlign: 'right' }}>全国</th><th>说明</th></tr></thead>
          <tbody>
            <tr><td><b>国家级代表性项目</b></td><td className="num">{NATIONAL.projects.toLocaleString()} 项</td><td>按申报地区计 {NATIONAL.subitems.toLocaleString()} 个子项，十大门类</td></tr>
            <tr><td><b>国家级代表性传承人</b></td><td className="num">{NATIONAL.inheritors.toLocaleString()} 人</td><td>在世 {NATIONAL.inheritorsAlive.toLocaleString()} 人，已支持记录 {NATIONAL.recorded.toLocaleString()} 人</td></tr>
            <tr><td><b>人类非遗代表作</b></td><td className="num">{NATIONAL.unesco} 项</td><td>列入 UNESCO 名录名册的项目</td></tr>
            <tr><td><b>国家级文化生态保护区</b></td><td className="num">{NATIONAL.ecozones} 个</td><td>以区域为单位整体保护</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="sec"><span>需要哪些支持</span><em>四项</em></h2>
      <div className="grid3">
        {ASKS.map(([t, d]) => (
          <div className="cardp" key={t}>
            <b>{t}</b>
            <p>{d}</p>
          </div>
        ))}
      </div>

      <p className="pnote" style={{ margin: '14px 34px 0' }}>
        样机内项目编号、批次、申报地区与保护单位均依据国务院公布名录整理；平台侧的数量为按批次推演的示例规模，
        用于说明建设完成后的数据形态，不代表已完成的采集量。
      </p>

      <NextCards items={[
        { l: '看平台总览', n: '省域分布、门类覆盖与建档进度', to: '/' },
        { l: '看一个完整项目', n: `以「${'龙泉青瓷烧制技艺'}」为例，从档案到资产`, to: `/project/${encodeURIComponent('Ⅷ-9')}` },
        { l: '看采集怎么做', n: '一次采集任务的四步与入库三查', to: '/capture' },
      ]} />
    </div>
  )
}
