import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestResultComponent } from './show-request-result.component';

describe('ShowRequestResultComponent', () => {
  let component: ShowRequestResultComponent;
  let fixture: ComponentFixture<ShowRequestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRequestResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRequestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
