import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskTypes: any[];
  tasks: any[];
  todayTasks: any[];
  progressValue: any;
  criticalTasks: any[];

  constructor(private taskService: TaskService, private router: Router) {
  }

  ngOnInit(): void {
    const userData: { usertoken: string; userid: number; errorMessage: string } = JSON.parse(localStorage.getItem('userData'));
    if (userData !== null && userData.usertoken) {
      this.fetchTasks();
    } else {
      this.router.navigate(['/']);
    }
  }

/**
 * fetching tasks from api
 */
  fetchTasks() {
    let taskObs: Observable<any>;
    taskObs = this.taskService.fetchTasks();
    taskObs.subscribe(
      resData => {
        this.tasks = resData.data;
        this.fetchCurrentDateTasks();
        this.fetchCrticalTasks();
        this.setTypeList();
      },
      errorMessage => {
        console.log(errorMessage);
      }
    );
  }

  /**
   * filtering current date tasks from all tasks
   */
  fetchCurrentDateTasks() {
    this.todayTasks = [];
    this.tasks.forEach((task, i) => {
      if (task.due_dt === this.formatDate()) {
        this.todayTasks.push(task);
      }
    })
    this.calculateProgress();
  }

  /**
   * calculates the progress of completed tasks of the day
   */
  calculateProgress() {
    let doneTasks = [];
    if (this.todayTasks[2])
      this.todayTasks[2].status = "Pending";
    this.todayTasks.forEach((task, i) => {
      if (task.status === "Done") {
        doneTasks.push(task);
      }
    })
    this.progressValue = (doneTasks.length / this.todayTasks.length) * 100;
  }

//gave this date as there were no current date response data
/**
 * format date to yyyy-mm-dd
 */
  formatDate() {
    var d = new Date("June 01,2019"),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }
/**
 * filter high priority tasks from current data tasks
 */
  fetchCrticalTasks() {
    this.criticalTasks = [];
    this.todayTasks.forEach((task, i) => {
      if (task.attr && task.attr.priority === "High") {
        this.criticalTasks.push(task);
      } else {
        this.criticalTasks.push({});
      }
    })
  }

  /**
   * creating and setting a type list data to display
   */
  setTypeList() {
    this.taskTypes = [
      {
        type: "Critical",
        color: "red",
        count: this.criticalTasks.length,
        tasksFiltered: this.criticalTasks,
      },
      {
        type: "All",
        color: "blue",
        count: this.todayTasks.length,
        tasksFiltered: this.todayTasks,
      }
    ]
  }
}
