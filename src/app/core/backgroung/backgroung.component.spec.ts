import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroungComponent } from './backgroung.component';

describe('BackgroungComponent', () => {
  let component: BackgroungComponent;
  let fixture: ComponentFixture<BackgroungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
