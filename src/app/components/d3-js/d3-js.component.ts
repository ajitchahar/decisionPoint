import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import * as d3 from 'd3';
import { svg, select } from 'd3';

@Component({
  selector: 'app-d3-js',
  templateUrl: './d3-js.component.html',
  styleUrls: ['./d3-js.component.css']
})
export class D3JsComponent implements OnInit {
  svgElement: HTMLElement;
  chartProps = [];
  constructor(
    private apiService: ApiServiceService,
  ) {
    this.mapGraph();
  }

  ngOnInit() {
  }


  mapGraph() {
    this.apiService.getGraphData().subscribe(data => {
      let total_mark_val = 0;
      let total_val_1 = 0;
      let total_val_2 = 0;
      this.chartProps = d3.csvParse(data)
      this.chartProps.forEach(element => {
        element.val_1 = +element.val_1;
        element.val_2 = +element.val_2;
        element.mark_val = +element.mark_val;
        total_mark_val += element.mark_val;
        total_val_2 += element.val_2;
        total_val_1 += element.val_1;
      });
      this.chartProps.splice(0,0,{'Brand':'Total KO','val_1':total_val_1,'val_2':total_val_2,'mark_val':total_mark_val})
      this.buildChart();
    });
  }
  buildChart() {
    const svg = select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const xValue = d => d['val_1'];
    const xValue1 = d => d['val_2'];
    const xValue2 = d => d['mark_val'];
    const yValue = d => d.Brand;
    const margin = { top: 50, right: 40, bottom: 77, left: 180 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(this.chartProps, xValue)])
      .range([0, innerWidth]);

    const yScale = d3.scaleBand()
      .domain(this.chartProps.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('.domain, .tick line')
      .remove();

    g.selectAll("bar")
      .data(this.chartProps)
      .enter().append("rect")
      .attr("x", 0)
      .attr("y", d => yScale(yValue(d)) + 20)
      .attr("width", d => xScale(xValue1(d)))
      .attr("height", yScale.bandwidth() - 40)
      .style('fill', function (d) { return d.val_1 >= d.mark_val ? "green" : "red" })
      .style('opacity', '0.5');

    g.selectAll("bar2")
      .data(this.chartProps)
      .enter().append("rect")
      .attr("x", 0)
      .attr("y", d => yScale(yValue(d)) + 30)
      .attr("width", d => xScale(xValue(d)))
      .attr("height", yScale.bandwidth() - 60)
      .style('fill', function (d) { return d.val_1 >= d.mark_val ? "green" : "red" })
      .style('opacity', '0.5');

    g.selectAll("bar3")
      .data(this.chartProps)
      .enter().append("rect")
      .attr("x", d => xScale(xValue2(d)))
      .attr("y", d => yScale(yValue(d)) + 20)
      .attr("width", 5)
      .attr("height", yScale.bandwidth() - 40)
      .style('fill', '#2e2b2b')
      .style('opacity', '1');
  }
}
