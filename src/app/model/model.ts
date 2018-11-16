export interface RegisterForm {
  username: string;
  password: string;
  repeatPassword: string;
}

export interface LoginForm {
  username: string;
  password: string;
  keepLogin: boolean;
}

export interface ForgetPasswordForm {
  username: string;
}

export class Pattern {
  public static password = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d].{8,}$';
}

export interface User {
  id: string;
  name?: string;
  surname?: string;
  imgPath?: string;
  username: string;
  token?: string;
}

export interface TournamentCreatorConfig {
  accessOptions: string [];
  competitionTypes: string [];
  systemTypes: { [key: string]: string [] };
  participantTypes: { [key: string]: string [] };
}

export interface TranslatableValue<T> {
  value: T;
  translationKey: string;
}

export interface Tuple2<FIRST, SECOND> {
  first: FIRST | any;
  second: SECOND | any;
}

export interface ProfileDTO {
  id: string;
}

export interface TournamentParticipantDTO extends ProfileDTO {
  firstName: string;
  secondName: string;
  participantStatus: string;
}


export interface TournamentDTO {
  id: string;
  name: string;
  description: string;
  place: string;
  img: string;
  status: string;
  accessOption: string;
  participants: TournamentParticipantDTO [];
  owner: ProfileDTO;
  startDate: Date;
  endDate: Date;
  systemType: string;
  competitionType: string;
  tournamentParticipantType: string;
  staffIds: string [];
  contributorsIds: string [];
  tournamentSystemState: string;
  minParticipants: number;
  maxParticipants: number;
  currentRound: number;
  winner: TournamentParticipantDTO;
  nextOpponent: TournamentParticipantDTO;
}

export interface UserTournamentsDTO {
  tournaments: { [key: string]: TournamentDTO []; };
}

export const COMPETITION_TYPE = {
  CHESS: 'COMPETITION_TYPE.CHESS'
};

export const ACCESS_OPTION = {
  PUBLIC: 'ACCESS_OPTION.PUBLIC',
  PRIVATE: 'ACCESS_OPTION.PRIVATE'
};

export const TOURNAMENT_SYSTEM_TYPE = {
  SWISS: 'TOURNAMENT_SYSTEM_TYPE.SWISS'
};

export const TOURNAMENT_PARTICIPANT_TYPE = {
  SINGLE: 'TOURNAMENT_PARTICIPANT_TYPE.SINGLE',
  TEAM: 'TOURNAMENT_PARTICIPANT_TYPE.TEAM'
};

export const TOURNAMENT_STATUS = {
  BEFORE_START: 'TOURNAMENT_STATUS.BEFORE_START',
  IN_PROGRESS: 'TOURNAMENT_STATUS.IN_PROGRESS',
  ENDED: 'TOURNAMENT_STATUS.ENDED',
}
