import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {

  chatForm: FormGroup;

  roomObj: Room;
  userInfo: string;

  joinButtonState: boolean;
  leaveButtonState: boolean;
  sendButtonState: boolean;

  messageInput: string;
  messages: string[] = [];

  rooms: Room[] = [{id: 1, name: 'Room1'}, {id: 2, name: 'Room2'}];

  constructor(private formBuilder: FormBuilder,
              private webSocketService: WebSocketService) {

      this.joinButtonState = false;
      this.leaveButtonState = true;
      this.sendButtonState = true;

  }

  ngOnInit() {
    this.chatForm = this.formBuilder.group({
      username: ['', Validators.required],
      room: ['', Validators.required]
    });

    this.webSocketService.listen('new-joined-user').subscribe((data: string) => {
      this.messages.push(data);
    });

    this.webSocketService.listen('broadcast-message-by-server').subscribe((message: string) => {
      this.messages.push(message);
    });

    this.webSocketService.listen('leaved-user').subscribe((data: string) => {
      this.messages.push(data);
    });

  }

  join() {
    const data = {
      user: this.chatForm.value.username,
      room: this.chatForm.value.room
    };

    if (data.user && data.room) {
      this.webSocketService.emit('join-room', data);

      this.userInfo = data.user;
      this.roomObj = data.room;

      this.changeButtonState();
      this.chatForm.reset();
    } else {
      alert ('Missing information !');
    }
  }

  leave() {
    this.webSocketService.emit('leave-room', {user: this.userInfo, room: this.roomObj});
    this.changeButtonState();
  }

  sendMessage() {
    this.webSocketService.emit('send-message', {room: this.roomObj, message: this.messageInput});
    this.messageInput = '';
  }

  private changeButtonState() {
    this.joinButtonState = !this.joinButtonState;
    this.leaveButtonState = !this.leaveButtonState;
    this.sendButtonState = !this.sendButtonState;
  }

}
