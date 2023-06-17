import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProctorModalComponent } from './select-proctor-modal.component';

describe('SelectProctorModalComponent', () => {
  let component: SelectProctorModalComponent;
  let fixture: ComponentFixture<SelectProctorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProctorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProctorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
