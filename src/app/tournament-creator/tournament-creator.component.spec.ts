import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCreatorComponent } from './tournament-creator.component';

describe('TournamentCreatorComponent', () => {
  let component: TournamentCreatorComponent;
  let fixture: ComponentFixture<TournamentCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
