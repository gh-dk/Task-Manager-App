import { AfterViewInit, Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-radial',
  templateUrl: './radial.component.html',
  styleUrl: './radial.component.scss'
})
export class RadialComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  getChartOptions() {
    return {
      series: [90, 85, 70],
      colors: ["#d48cf2", "#c3ddfd", "#bcf0da"],  
      chart: {
        height: "380px",
        width: "100%",
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          track: {
            background: '#E5E7EB',
          },
          dataLabels: {
            show: false,
          },
          hollow: {
            margin: 0,
            size: "32%",
          }
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -23,
          bottom: -20,
        },
      },
      labels: ["Done", "In progress", "To do"],
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value: number) {
            return value + '%';
          }
        }
      }
    }
  }

  renderChart() {
    const chartElement = document.querySelector("#radial-chart");

    if (chartElement && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(chartElement, this.getChartOptions());
      chart.render();
    }
  }
}