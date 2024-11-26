import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignTaskPage } from './assign-task.page';

describe('AssignTaskPage', () => {
  let component: AssignTaskPage;
  let fixture: ComponentFixture<AssignTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
