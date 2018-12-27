import {Component, OnInit} from '@angular/core';
import {FloatingButtonService} from '../floating-button.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {

  constructor(
    private floatingButtonService: FloatingButtonService
  ) { }

  ngOnInit() {
  }

  btnClick() {
    this.floatingButtonService.runButtonClickAction();
  }

  showBtn():boolean {
    return this.floatingButtonService.isAction();
  }
}
