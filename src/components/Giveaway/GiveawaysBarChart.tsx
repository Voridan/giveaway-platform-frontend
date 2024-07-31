import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { StatsParticipant } from '../../types';

interface ParticipantsChartProps {
  data: StatsParticipant[];
}

const ParticipantsChart: FC<ParticipantsChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const margin = { top: 40, right: 40, bottom: 60, left: 40 };
    const width = chartRef.current!.clientWidth - margin.left - margin.right;
    const height = chartRef.current!.clientHeight - margin.top - margin.bottom;
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', chartRef.current!.clientWidth)
      .attr('height', chartRef.current!.clientHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.title))
      .padding(0.2);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const upperVelueBound = Math.max(
      ...data.map((item) => item.participantsCount)
    );

    const y = d3.scaleLinear().domain([0, upperVelueBound]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    svg
      .selectAll('mybar')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.title) || 0)
      .attr('y', (d) => y(d.participantsCount))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.participantsCount))
      .attr('fill', '#5f0f40');
  }, []);

  return <svg style={{ width: '100%', height: '100%' }} ref={chartRef}></svg>;
};

export default ParticipantsChart;
