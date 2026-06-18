import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import type { ChannelMetric } from '../types';
import { useEChart } from './useEChart';

interface ChannelChartProps {
  data: ChannelMetric[];
}

export function ChannelChart({ data }: ChannelChartProps) {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params) => {
          const rows = Array.isArray(params) ? params : [params];
          return rows.map((item) => `${item.marker}${item.seriesName}: ${item.value}`).join('<br/>');
        }
      },
      legend: { top: 0, right: 0 },
      grid: { left: 76, right: 36, top: 44, bottom: 24 },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: '#edf1f7' } } },
      yAxis: {
        type: 'category',
        data: data.map((item) => item.channel),
        axisTick: { show: false }
      },
      series: [
        {
          name: '确认订单',
          type: 'bar',
          data: data.map((item) => item.confirmedOrders),
          barWidth: 12,
          itemStyle: { color: '#2f6fed', borderRadius: [0, 6, 6, 0] }
        },
        {
          name: '确认转化率',
          type: 'bar',
          data: data.map((item) => Number((item.conversionRate * 100).toFixed(1))),
          barWidth: 12,
          itemStyle: { color: '#0f9f6e', borderRadius: [0, 6, 6, 0] }
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
          <p>渠道来源</p>
          <h2>订单与确认率分析</h2>
        </div>
        <span className="mock-badge">模拟数据</span>
      </div>
      <p className="chart-note">用于比较流量质量：小红书贡献访问，微信群更接近信任成交，投放策略不能只看流量规模。</p>
      <div className="chart" ref={chartRef} />
    </section>
  );
}
