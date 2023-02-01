import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectToCustomerComponent } from './add-project-to-customer.component';

describe('AddProjectToCustomerComponent', () => {
  let component: AddProjectToCustomerComponent;
  let fixture: ComponentFixture<AddProjectToCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectToCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
