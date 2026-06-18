import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import type { RepeatMetric } from '../types';
import { useEChart } from './useEChart';

interface RepeatChartProps {
  data: RepeatMetric[];
}

export function RepeatChart({ data }: RepeatChartProps) {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: 'axis' },
      legend: { top: 0, right: 0 },
      grid: { left: 42, right: 46, top: 44, bottom: 28 },
      xAxis: { type: 'category', data: data.map((item) => item.label), axisTick: { show: false } },
      yAxis: [
        { type: 'value', name: '客户数', splitLine: { lineStyle: { color: '#edf1f7' } } },
        { type: 'value', name: '复购率', axisLabel: { formatter: '{value}%' }, splitLine: { show: false } }
      ],
      series: [
        {
          name: '新客',
          type: 'bar',
          stack: 'customers',
          data: data.map((item) => item.newCustomers),
          itemStyle: { color: '#c9d7f7', borderRadius: [6, 6, 0, 0] }
        },
        {
          name: '复购客户',
          type: 'bar',
          stack: 'customers',
          data: data.map((item) => item.returningCustomers),
          itemStyle: { color: '#2f6fed', borderRadius: [6, 6, 0, 0] }
        },
        {
          name: '复购率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          data: data.map((item) => Number((item.repeatRate * 100).toFixed(1))),
          lineStyle: { color: '#0f9f6e', width: 3 },
          itemStyle: { color: '#0f9f6e' }
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
          <p>复购分析</p>
          <h2>新老客户结构</h2>
        </div>
        <span className="mock-badge">模拟数据</span>
      </div>
      <p className="chart-note">用于判断服务是否沉淀信任：复购客户占比持续抬升，说明日报、履约和老客触达正在形成长期价值。</p>
      <div className="chart" ref={chartRef} />
    </section>
  );
}
