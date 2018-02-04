import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdersComponent } from './list.page';

describe('ListComponent', () => {
  let component: ListOrdersComponent;
  let fixture: ComponentFixture<ListOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
