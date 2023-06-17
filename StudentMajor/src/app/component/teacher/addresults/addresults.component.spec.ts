import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresultsComponent } from './addresults.component';

describe('AddresultsComponent', () => {
  let component: AddresultsComponent;
  let fixture: ComponentFixture<AddresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
