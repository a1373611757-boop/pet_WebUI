import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import type { ServiceMetric } from '../types';
import { serviceLabels } from '../data/mockData';
import { useEChart } from './useEChart';

interface ServiceChartProps {
  data: ServiceMetric[];
}

export function ServiceChart({ data }: ServiceChartProps) {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: 'item', formatter: '{b}<br/>订单: {c}<br/>占比: {d}%' },
      legend: { bottom: 0, left: 'center' },
      series: [
        {
          name: '服务类型',
          type: 'pie',
          radius: ['48%', '72%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 3 },
          label: { formatter: '{b}\n{d}%', color: '#172033', fontWeight: 700 },
          data: data.map((item) => ({ name: serviceLabels[item.service], value: item.orders }))
        }
      ],
      color: ['#2f6fed', '#0f9f6e', '#e29b32', '#d85f5f']
    }),
    [data]
  );
  const chartRef = useEChart(option);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p>服务结构</p>
          <h2>服务类型占比</h2>
        </div>
        <span className="mock-badge">模拟数据</span>
      </div>
      <p className="chart-note">用于判断服务组合：寄养贡献收入，上门喂养更适合作为低门槛复购入口。</p>
      <div className="chart" ref={chartRef} />
    </section>
  );
}
