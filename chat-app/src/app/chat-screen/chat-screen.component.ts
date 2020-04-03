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
  rooms: Room[] = [{id: 1, name: 'Room1'}, {id: 2, name: 'Room2'}];
  messages: string[] = [];

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

  }

  join() {
    const data = {
      user: this.chatForm.value.username,
      room: this.chatForm.value.room
    };

    this.webSocketService.emit('join-room', data);

    this.chatForm.reset();
  }

}
