import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersEditComponent } from './offers-edit.component';

describe('OffersEditComponent', () => {
  let component: OffersEditComponent;
  let fixture: ComponentFixture<OffersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
