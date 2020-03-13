import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpadComponent } from './testpad.component';

describe('TestpadComponent', () => {
  let component: TestpadComponent;
  let fixture: ComponentFixture<TestpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
