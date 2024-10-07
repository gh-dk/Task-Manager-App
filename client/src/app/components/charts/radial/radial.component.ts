import { AfterViewInit, Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-radial',
  templateUrl: './radial.component.html',
  styleUrl: './radial.component.scss'
})
export class RadialComponent implements OnInit, AfterViewInit {

  constructor(public taskService: TaskService, public userService: UserService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  getChartOptions() {
    const doneTask = this.userService.doneTask.length * 100 / this.userService.userData.tasks.length
    const ongoingTask = this.userService.ongoingTask.length * 100 / this.userService.userData.tasks.length
    const todoTask = this.userService.todoTask.length * 100 / this.userService.userData.tasks.length
    const backlogTask = this.userService.backlogTask.length * 100 / this.userService.userData.tasks.length
    return {
      series: [backlogTask, todoTask, ongoingTask, doneTask],
      colors: ["#00000033", "#3f83f8", "#0e9f6e", "#f05252"],
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
      labels: ["Backlog", "Todo", "Ongoing", "Done"],
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
            return Math.round(value) + '%';
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