import { AfterViewInit, Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { UserService } from '../../../services/user.service';
import moment from 'moment';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit, AfterViewInit {
  timePeriod: string = 'Year';
  chart: ApexCharts | undefined;

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart() {
    const pieChartElement = document.getElementById('pie-chart');

    if (pieChartElement && typeof ApexCharts !== 'undefined') {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new ApexCharts(pieChartElement, this.getChartOptions());
      this.chart.render();
    }
  }

  getTaskCountByTimePeriod() {
    const now = moment();

    let taskCounts = {
      backlog: 0,
      todo: 0,
      ongoing: 0,
      done: 0,
    };

    console.log('len', this.userService.userData.tasks);

    this.userService.userData.tasks.forEach((task) => {
      const deadline = moment(task.deadline, 'YYYY-MM-DD');

      let isInTimePeriod = false;

      switch (this.timePeriod) {
        case 'Week':
          isInTimePeriod = deadline.isSame(now, 'week');
          break;
        case 'Month':
          isInTimePeriod = deadline.isSame(now, 'month');
          break;
        case 'Year':
          isInTimePeriod = deadline.isSame(now, 'year');
          break;
      }

      if (isInTimePeriod) {
        if (task.stage == 3) {
          taskCounts.done++;
        } else if (task.stage == 2) {
          taskCounts.ongoing++;
        } else if (task.stage == 1) {
          taskCounts.todo++;
        } else {
          taskCounts.backlog++;
        }
      }
      // console.log('in if', task.stage, taskCounts);
    });

    return taskCounts;
  }

  getChartOptions() {
    const taskCounts = this.getTaskCountByTimePeriod();

    const totalTasks =
      taskCounts.backlog +
      taskCounts.todo +
      taskCounts.ongoing +
      taskCounts.done;

    const backlogTaskPercent = totalTasks
      ? (taskCounts.backlog * 100) / totalTasks
      : 0;
    const todoTaskPercent = totalTasks
      ? (taskCounts.todo * 100) / totalTasks
      : 0;
    const ongoingTaskPercent = totalTasks
      ? (taskCounts.ongoing * 100) / totalTasks
      : 0;
    const doneTaskPercent = totalTasks
      ? (taskCounts.done * 100) / totalTasks
      : 0;

    return {
      series: [
        backlogTaskPercent,
        todoTaskPercent,
        ongoingTaskPercent,
        doneTaskPercent,
      ],
      colors: ['#00000033', '#3f83f8', '#0e9f6e', '#f05252'],
      chart: {
        height: 380,
        width: '100%',
        type: 'pie',
      },
      stroke: {
        colors: ['#ffffff'],
        width: 2,
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          dataLabels: {
            offset: -25,
            minAngleToShowLabel: 10,
          },
        },
      },
      labels: [
        'Backlog : ' + taskCounts.backlog,
        'Todo : ' + taskCounts.todo,
        'Ongoing : ' + taskCounts.ongoing,
        'Done : ' + taskCounts.done,
      ],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'bold',
          fontSize: '16px',
        },
        formatter: function (val: any) {
          return val.toFixed(1) + '%';
        },
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
      },
    };
  }

  onTimePeriodChange() {
    console.log('called re render graph');

    this.renderChart();
  }
}
