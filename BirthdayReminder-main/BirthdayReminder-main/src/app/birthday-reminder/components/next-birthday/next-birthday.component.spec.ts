import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextBirthdayComponent } from './next-birthday.component';

describe('NextBirthdayComponent', () => {
  let component: NextBirthdayComponent;
  let fixture: ComponentFixture<NextBirthdayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextBirthdayComponent]
    });
    fixture = TestBed.createComponent(NextBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
