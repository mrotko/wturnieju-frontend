import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FloatingButtonService {

  private btnClickAction: Function;

  constructor() { }

  setButtonClickAction(action: () => void) {
    this.btnClickAction = action;
  }

  isAction(): boolean {
    return (this.btnClickAction !== null) && (this.btnClickAction !== undefined);
  }

  runButtonClickAction() {
    if (this.btnClickAction) {
      this.btnClickAction();
    }
  }
}
