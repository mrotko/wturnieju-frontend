import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InviteTournamentParticipantPopupService} from '../invite-tournament-participant-popup.service';
import {FormControl, Validators} from '@angular/forms';
import {LocaleMessages} from '../locale-messages';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

interface UserItem {
  id: string;
  icon: string;
  name: string;
}

interface AutocompleteOption {
  id: string;
  icon: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-invite-tournament-participant-popup',
  templateUrl: './invite-tournament-participant-popup.component.html',
  styleUrls: ['./invite-tournament-participant-popup.component.scss']
})
export class InviteTournamentParticipantPopupComponent implements OnInit {

  lm = LocaleMessages;

  searchFormControl = new FormControl('', [Validators.min(3)]);

  searchAutocompleteOptions: Observable<AutocompleteOption []>;

  selectedUsers: UserItem [];

  constructor(
    private dialogRef: MatDialogRef<InviteTournamentParticipantPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private popupService: InviteTournamentParticipantPopupService
  ) { }

  ngOnInit() {
    this.selectedUsers = [];
    this.initAutocompleteOptions()
  }

  addUserToSelected(autocompleteOption: AutocompleteOption) {
    const user: UserItem = {
      id: autocompleteOption.id,
      icon: autocompleteOption.icon,
      name: autocompleteOption.name
    };
    this.selectedUsers.push(user);
  }

  removeUserFromSelected(userId: string) {
    const index = this.selectedUsers.findIndex(userItem => userItem.id === userId);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1);
    }
  }

  private initAutocompleteOptions() {
    this.searchFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.prepareAutocompleteOptions(value))
      ).subscribe(options => this.searchAutocompleteOptions = options);
  }

  prepareAutocompleteOptions(query: string): Observable<AutocompleteOption []> {
    if (query && query.length > 2) {
      return this.popupService.findUsers(query.toLowerCase(), this.getSelectedUsersIds())
        .pipe(map((users): AutocompleteOption [] => {
          return users.map((user): AutocompleteOption => {
            return {
              id: user.id,
              icon: "",
              name: user.fullName,
              description: ""
            };
          });
        }));
    } else {
      return new Observable();
    }
  }

  getSelectedUsersIds(): string [] {
    return this.selectedUsers.map(user => user.id);
  }

  cancelBtnClick() {
    this.dialogRef.close();
  }
}
