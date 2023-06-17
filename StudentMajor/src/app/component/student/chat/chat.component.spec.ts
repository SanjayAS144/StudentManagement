import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: StudentChatComponent;
  let fixture: ComponentFixture<StudentChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
