import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentParticipantsConfigurationComponent } from './tournament-participants-configuration.component';

describe('TournamentParticipantsConfigurationComponent', () => {
  let component: TournamentParticipantsConfigurationComponent;
  let fixture: ComponentFixture<TournamentParticipantsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentParticipantsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentParticipantsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
