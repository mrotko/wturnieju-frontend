import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvitationStatus, ParticipantDTO} from '../model/model';


@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  @Input() participant: ParticipantDTO;

  @Output() removeBtnClick: EventEmitter<String> = new EventEmitter();

  @Output() acceptBtnClick: EventEmitter<String> = new EventEmitter();

  @Output() messageBtnClick: EventEmitter<String> = new EventEmitter();

  constructor() {
  }

  isRejected() {
    return this.participant.invitationStatus === InvitationStatus.REJECTED;
  }

  ngOnInit() {

  }
}
