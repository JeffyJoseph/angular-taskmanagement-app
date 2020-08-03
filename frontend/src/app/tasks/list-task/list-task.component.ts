import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {
  @Input() tasks: any;
  showInfo: boolean = false;
  taskDetails: any;

  constructor() { }

  ngOnInit(): void {  
  }
/**
 * setting show modal value to true
 */
  showMore(data) {
    this.taskDetails = data;
    this.showInfo = true;
  }

  /**
   * setting show modal value to false
   */
  onHandleClose() {
    this.showInfo = false;
  }
}


