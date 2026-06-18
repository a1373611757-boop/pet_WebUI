import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import type { OccupancyMetric } from '../types';
import { formatPercent } from '../data/metrics';
import { useEChart } from './useEChart';

interface OccupancyChartProps {
  data: OccupancyMetric[];
}

export function OccupancyChart({ data }: OccupancyChartProps) {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const rows = Array.isArray(params) ? params : [params];
          return rows
            .map((item) => `${item.marker}${item.seriesName}: ${item.seriesName === '入住率' ? formatPercent(Number(item.value) / 100) : item.value}`)
            .join('<br/>');
        }
      },
      legend: { top: 0, right: 0 },
      grid: { left: 42, right: 48, top: 44, bottom: 28 },
      xAxis: { type: 'category', data: data.map((item) => item.date), axisTick: { show: false } },
      yAxis: [
        { type: 'value', name: '房位', splitLine: { lineStyle: { color: '#edf1f7' } } },
        { type: 'value', name: '入住率', min: 0, max: 100, axisLabel: { formatter: '{value}%' }, splitLine: { show: false } }
      ],
      series: [
        {
          name: '已入住房位',
          type: 'bar',
          data: data.map((item) => item.occupiedPets),
          barWidth: 16,
          itemStyle: { color: '#2f6fed', borderRadius: [6, 6, 0, 0] }
        },
        {
          name: '入住率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          data: data.map((item) => Number((item.occupancyRate * 100).toFixed(1))),
          lineStyle: { color: '#e29b32', width: 3 },
          itemStyle: { color: '#e29b32' }
        }
      ]
    }),
    [data]
  );
  const chartRef = useEChart(option);

  return (
    <section className="panel panel--wide">
      <div className="panel-header">
        <div>
          <p>入住率趋势</p>
          <h2>房位使用与高峰压力</h2>
        </div>
        <span className="mock-badge">模拟数据</span>
      </div>
      <p className="chart-note">用于识别供给压力：周末和节假日前入住率接近满载时，需要提前扩容或引导到替代服务。</p>
      <div className="chart chart--large" ref={chartRef} />
    </section>
  );
}
