import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Giveaway {
  name: string;
  participantsCount: number;
}

interface GiveawayBarChartProps {
  data: Giveaway[];
}

const GiveawaysBarChart: FC<GiveawayBarChartProps> = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Define the dimensions and margins of the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Append the svg object to the chartRef
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .padding(0.2);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // // Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.participantsCount) || 0])
      .nice()
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name)!)
      .attr('y', (d) => y(d.participantsCount))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.participantsCount))
      .attr('fill', '#69b3a2');
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default GiveawaysBarChart;
