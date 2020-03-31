import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {

  chatForm: FormGroup;

  rooms: Room[] = [{id: 1, name: 'Room1'}, {id: 1, name: 'Room1'}];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.chatForm = this.formBuilder.group({
      username: ['', Validators.required],
      room: ['', Validators.required]
    });
  }
}
