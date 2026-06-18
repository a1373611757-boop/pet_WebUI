import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import type { DailyMetric } from '../types';
import { useEChart } from './useEChart';

interface TrendChartProps {
  data: DailyMetric[];
}

export function TrendChart({ data }: TrendChartProps) {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: 'axis' },
      legend: { top: 0, right: 0, itemWidth: 10, itemHeight: 10 },
      grid: { left: 40, right: 48, top: 44, bottom: 28 },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((item) => item.date),
        axisLine: { lineStyle: { color: '#d8dee9' } },
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value',
          name: '预约量',
          splitLine: { lineStyle: { color: '#edf1f7' } }
        },
        {
          type: 'value',
          name: '确认订单',
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '预约量',
          type: 'line',
          smooth: true,
          data: data.map((item) => item.appointments),
          areaStyle: { color: 'rgba(47, 111, 237, 0.12)' },
          lineStyle: { width: 3, color: '#2f6fed' },
          itemStyle: { color: '#2f6fed' }
        },
        {
          name: '确认订单',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          data: data.map((item) => item.confirmedOrders),
          lineStyle: { width: 3, color: '#0f9f6e' },
          itemStyle: { color: '#0f9f6e' }
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
          <p>预约趋势</p>
          <h2>预约量与确认订单</h2>
        </div>
        <span className="mock-badge">模拟数据</span>
      </div>
      <p className="chart-note">用于判断增长是否真实转化：如果预约量上涨但确认订单没有同步上涨，说明信任说明、价格或档期承接存在阻塞。</p>
      <div className="chart chart--large" ref={chartRef} />
    </section>
  );
}
