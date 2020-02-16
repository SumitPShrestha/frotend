import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTypeEditComponent } from './category-type-edit.component';

describe('CategoryTypeEditComponent', () => {
  let component: CategoryTypeEditComponent;
  let fixture: ComponentFixture<CategoryTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
