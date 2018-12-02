import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareTournamentRoundFixturesDialogComponent } from './prepare-tournament-round-fixtures-dialog.component';

describe('PrepareTournamentRoundFixturesDialogComponent', () => {
  let component: PrepareTournamentRoundFixturesDialogComponent;
  let fixture: ComponentFixture<PrepareTournamentRoundFixturesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepareTournamentRoundFixturesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareTournamentRoundFixturesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
