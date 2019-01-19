import {FinishGameEventDto, GameFixtureDto, StartGameEventDto} from '../model/model';
import {Observable} from 'rxjs';
import {RequestUrl} from '../config/requestUrl';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()


export class GameEditorService {

  constructor(
    private http: HttpClient
  ) { }

  startGame(dto: StartGameEventDto): Observable<GameFixtureDto> {
    return this.http.patch<GameFixtureDto>(RequestUrl.gameEditor.startGame, dto);
  }

  finishGame(dto: FinishGameEventDto): Observable<GameFixtureDto> {
    return this.http.patch<GameFixtureDto>(RequestUrl.gameEditor.finishGame, dto);
  }
}
