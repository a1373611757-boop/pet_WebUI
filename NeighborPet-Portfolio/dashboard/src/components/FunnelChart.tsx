import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import type { FunnelStep } from '../types';
import { useEChart } from './useEChart';

interface FunnelChartProps {
  data: FunnelStep[];
}

export function FunnelChart({ data }: FunnelChartProps) {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: 'item', formatter: '{b}: {c}' },
      series: [
        {
          name: '私域转化漏斗',
          type: 'funnel',
          left: '4%',
          right: '4%',
          top: 12,
          bottom: 8,
          minSize: '30%',
          maxSize: '100%',
          sort: 'descending',
          gap: 6,
          label: { color: '#172033', fontWeight: 700 },
          labelLine: { show: false },
          itemStyle: { borderColor: '#fff', borderWidth: 2 },
          data: data.map((item, index) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: ['#2f6fed', '#0f9f6e', '#e29b32', '#d85f5f', '#7c5cff'][index] }
          }))
        }
      ]
    }),
    [data]
  );
  const chartRef = useEChart(option);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p>私域转化</p>
          <h2>社群到入住漏斗</h2>
        </div>
        <span className="mock-badge">模拟数据</span>
      </div>
      <p className="chart-note">用于定位私域链路流失点：从访问、点击服务到确认订单，观察用户在哪一步需要更强的信任信息。</p>
      <div className="chart" ref={chartRef} />
    </section>
  );
}
