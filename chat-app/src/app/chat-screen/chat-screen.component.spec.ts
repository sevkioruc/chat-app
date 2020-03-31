import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatScreenComponent } from './chat-screen.component';

describe('ChatScreenComponent', () => {
  let component: ChatScreenComponent;
  let fixture: ComponentFixture<ChatScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
