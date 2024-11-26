import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingTasksPage } from './pending-tasks.page';

describe('PendingTasksPage', () => {
  let component: PendingTasksPage;
  let fixture: ComponentFixture<PendingTasksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
