import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() data: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
  constructor() { }

  ngOnInit(): void {

  }

}
