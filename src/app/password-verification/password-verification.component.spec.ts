import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordVerificationComponent } from './password-verification.component';

describe('PasswordVerificationComponent', () => {
  let component: PasswordVerificationComponent;
  let fixture: ComponentFixture<PasswordVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
