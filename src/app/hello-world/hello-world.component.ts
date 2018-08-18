import {Component, OnInit} from '@angular/core';
import {HelloWorldMessage, HelloWorldService} from '../service/hello-world.service';
import {MatCheckboxChange} from '@angular/material';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  messages: HelloWorldMessage [] = [];

  selectedMessages: string [] = [];

  multipleSelect = false;

  constructor(private helloWorldService: HelloWorldService) {
  }

  ngOnInit() {
    this.getAllMessages();
  }

  addMessage(input: any) {
    console.log(input.value);
    this.helloWorldService.addMessage(input.value).subscribe(() => this.getAllMessages());
    input.value = null;
  }

  getAllMessages() {
    this.helloWorldService.getAllMessages().subscribe(
      messages => this.messages = messages, err => console.log(err));
  }

  deleteMessage(id: string) {
    this.helloWorldService.deleteMessage(id).subscribe(() => this.getAllMessages());
  }

  deleteSelectedMessages() {
    console.log(this.selectedMessages);
    this.helloWorldService.deleteMessages(this.selectedMessages).subscribe(() => this.getAllMessages());
    this.clearSelectedMessages();
  }

  selectMessage(id: string) {
    this.selectedMessages.push(id);
  }

  unselectMessage(id: string) {
    const index = this.selectedMessages.findIndex(value => value === id);
    this.selectedMessages.splice(index, 1);
  }

  clearSelectedMessages() {
    this.selectedMessages = [];
  }

  checkboxChanged($event: MatCheckboxChange) {
    if ($event.checked) {
      this.selectMessage($event.source.id);
    } else {
      this.unselectMessage($event.source.id);
    }
  }
}
