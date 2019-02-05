import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {LocaleMessages} from '../locale-messages';
import {Router} from '@angular/router';
import {RouterUrl} from '../config/routerUrl';

interface AutocompleteOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-tournament-search',
  templateUrl: './tournament-search.component.html',
  styleUrls: ['./tournament-search.component.scss']
})
export class TournamentSearchComponent implements OnInit {
  lm = LocaleMessages;

  autocompleteOptions: Observable<AutocompleteOption []>;

  searchFormControl = new FormControl('', [Validators.min(3)]);

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initAutocompleteOptions();
  }

  private initAutocompleteOptions() {
    this.searchFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.prepareAutocompleteOptions(value))
      ).subscribe(options => this.autocompleteOptions = options);
  }

  prepareAutocompleteOptions(query: string): Observable<AutocompleteOption []> {
    if (query && query.length > 2) {
      return this.searchService.findTournaments(query.toLowerCase()).pipe(
        map(result => {
          return result.data.map(tournamentSearchDto => {
            return {
              id: tournamentSearchDto.tournamentId,
              name: tournamentSearchDto.tournamentName
            }
          })
        })
      );
    } else {
      return new Observable();
    }
  }

  acceptTournamentSelection(option: AutocompleteOption) {
    this.router.navigate([RouterUrl.tournaments, option.id]).catch();
  }
}
