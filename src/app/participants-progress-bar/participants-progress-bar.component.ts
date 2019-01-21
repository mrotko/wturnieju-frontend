import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

interface PanelData {
  width: number;
  value: number;
}

@Component({
  selector: 'app-participants-progress-bar',
  templateUrl: './participants-progress-bar.component.html',
  styleUrls: ['./participants-progress-bar.component.scss']
})

export class ParticipantsProgressBarComponent implements OnInit, OnChanges {

  PANEL_MAX_WIDTH = 90;

  @Input() begin: number;

  @Input() end: number;

  @Input() currentValue: number;

  @Input() internalValue: number;

  leftPanelData: PanelData;

  rightPanelData: PanelData;

  constructor() { }

  ngOnInit() {
    this.initPanelData();
  }

  private initPanelData() {
    this.leftPanelData = {
      value: this.calculateLeftPanelValue(),
      width: this.calculateLeftPanelWidth()
    };

    this.rightPanelData = {
      value: this.calculateRightPanelValue(),
      width: this.calculateRightPanelWidth()
    }
  }

  private calculateLeftPanelWidth(): number {
    return this.PANEL_MAX_WIDTH - (100 - this.internalValue / this.end * 100);
  }

  private calculateRightPanelWidth(): number {
    return this.PANEL_MAX_WIDTH - (100 - (this.end - this.internalValue) / this.end * 100);
  }

  private calculateLeftPanelValue(): number {
    return this.currentValue / this.internalValue * 100;
  }

  private calculateRightPanelValue(): number {
    return (this.currentValue - this.internalValue) / (this.end - this.internalValue) * 100;
  }

  private isWarn(): boolean {
    return this.rightPanelData.value < 0 || this.rightPanelData.value > 100;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.leftPanelData && this.rightPanelData) {
      this.leftPanelData.value = this.calculateLeftPanelValue();
      this.rightPanelData.value = this.calculateRightPanelValue();
    }
  }

  getBarColor(): string {
    return this.isWarn() ? 'warn' : 'primary';
  }
}
