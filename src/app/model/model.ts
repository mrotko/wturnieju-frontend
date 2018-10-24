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

export interface TranslatableEnum {
  value: string;
  translation: string;
}

export interface TournamentCreatorCommonForm {
  name: string;
  accessOption: TranslatableEnum;
  fromDate: Date;
  toDate: Date;
  place: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
  competition: TranslatableEnum;
}

export interface TournamentCreatorCompetitionCommonForm {
  tournamentSystem: TranslatableEnum;
  participantType: TranslatableEnum;
}

export interface TournamentCreatorChessForm extends TournamentCreatorCompetitionCommonForm {

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
