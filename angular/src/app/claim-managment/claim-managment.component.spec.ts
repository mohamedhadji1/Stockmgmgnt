import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimManagmentComponent } from './claim-managment.component';

describe('ClaimManagmentComponent', () => {
  let component: ClaimManagmentComponent;
  let fixture: ComponentFixture<ClaimManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
