import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCreateComponent } from './offers-create.component';

describe('OffersCreateComponent', () => {
  let component: OffersCreateComponent;
  let fixture: ComponentFixture<OffersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
