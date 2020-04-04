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
  messages: string[] = [];
  messageInput: string;
  rooms: Room[] = [{id: 1, name: 'Room1'}, {id: 2, name: 'Room2'}];

  constructor(private formBuilder: FormBuilder,
              private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.chatForm = this.formBuilder.group({
      username: ['', Validators.required],
      room: ['', Validators.required]
    });

    this.webSocketService.listen('new-joined-user').subscribe((data: string) => {
      this.messages.push(data);
    });

    this.webSocketService.listen('broadcast-message-by-server')
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  join() {
    const data = {
      user: this.chatForm.value.username,
      room: this.chatForm.value.room
    };

    this.webSocketService.emit('join-room', data);
    this.chatForm.reset();
  }

  sendMessage() {
    this.webSocketService.emit('send-message', this.messageInput);
    this.messageInput = '';
  }

}
