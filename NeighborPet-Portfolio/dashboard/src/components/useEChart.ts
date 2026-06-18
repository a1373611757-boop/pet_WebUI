import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

export function useEChart(option: EChartsOption) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const chart = echarts.init(ref.current);
    chart.setOption(option);

    const resize = () => chart.resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      chart.dispose();
    };
  }, [option]);

  return ref;
}
