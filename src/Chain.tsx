import { useState } from 'react'

export type ChainNode = {
  k: string
  t: string
  s: string
  state: 'done' | 'doing' | 'todo'
  detail: [string, string][]
  asset?: [string, string][]
  time?: [string, string][]
}

export default function RightsChain({ nodes }: { nodes: ChainNode[] }) {
  const [cur, setCur] = useState(0)
  const [view, setView] = useState<'rights' | 'asset' | 'time'>('rights')
  const n = nodes[cur]
  const rows = view === 'asset' ? (n.asset || n.detail) : view === 'time' ? (n.time || n.detail) : n.detail

  return (
    <div className="chain-wrap">
      <div className="chain-line" style={{ ['--p' as any]: `${((cur + 0.5) / nodes.length) * 100}%` }}>
        {nodes.map((x, i) => (
          <div
            key={x.k}
            className={`cn ${x.state} ${i === cur ? 'on' : ''}`}
            onMouseEnter={() => setCur(i)}
            onClick={() => setCur(i)}
            role="button"
            tabIndex={0}
          >
            <div className="cn-k">{x.k}</div>
            <div className="cn-dot" />
            <div className="cn-lbl">{x.t}</div>
            <div className="cn-s">{x.s}</div>
            <div className="cn-cta">查看依据 <i>›</i></div>
          </div>
        ))}
      </div>

      <div className="chain-tabs">
        {([['rights', '权属依据'], ['asset', '资产构成'], ['time', '时间节点']] as const).map(([k, l]) => (
          <button key={k} className={view === k ? 'on' : ''} onClick={() => setView(k)}>{l}</button>
        ))}
      </div>

      <div className="chain-panel" key={n.k + view}>
        <div className="cp-h">
          <b>{n.t}</b>
          <span>{n.state === 'done' ? '已完成' : n.state === 'doing' ? '进行中' : '未开始'}</span>
        </div>
        <table className="meta cp-tbl">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}><th>{k}</th><td>{v}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
