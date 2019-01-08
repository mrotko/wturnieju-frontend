import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsProgressBarComponent } from './participants-progress-bar.component';

describe('ParticipantsProgressBarComponent', () => {
  let component: ParticipantsProgressBarComponent;
  let fixture: ComponentFixture<ParticipantsProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
