import { Component, ViewEncapsulation, OnInit, Input, OnChanges } from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { STATISTICS } from './statistics';

import DailyInventoryChart from '../../models/DailyInventoryChart';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() private data: Array<DailyInventoryChart>;
  title = 'Bar Chart';
  sumValues: Array<number> = [];

  ngOnInit() {
    this.draw();
  }

  ngOnChanges() {
    if (this.data) {
      const update = d3.select('svg').data(this.data);
      update.exit().remove();
    } else {
      this.draw();
    }
  }
  draw() {
    const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 500 - 2 * margin;

    const svg = d3.select('svg');

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    this.data.forEach(elem => {
      this.sumValues.push(elem.onHandValueSum);
    });

    const yScale = d3Scale.scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...this.sumValues)]);

    chart.append('g')
      .call(d3Axis.axisLeft(yScale).tickFormat(d3.format('~s')));

    const xScale = d3Scale.scaleBand()
      .range([0, width])
      .domain(this.data.map((d) => d.field))
      .padding(0.2);

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3Axis.axisBottom(xScale));

    svg.append('text')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('font-size', '0.8rem')
      .text('On Hand Value');

    svg.append('text')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '0.8rem')
      .text('Date 2014 Q2 June');

    chart.selectAll()
      .data(this.data)
      .enter()
      .append('rect')
      .style('fill', '#0066a1')
      .attr('x', (s) => xScale(s.field))
      .attr('y', (s) => yScale(s.onHandValueSum))
      .attr('height', (s) => height - yScale(s.onHandValueSum))
      .attr('width', xScale.bandwidth());
  }
}
