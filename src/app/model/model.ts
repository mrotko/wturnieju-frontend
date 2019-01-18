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

export interface ExceptionErrorDTO {
  message: string;
  simpleClassName: string;
}

export interface User {
  id: string;
  name?: string;
  surname?: string;
  imgPath?: string;
  username: string;
  token?: string;
  authorities: UserGrantedAuthority [];
}

export interface UserConfig {
  authorityTypes: AuthorityType [];
}

export interface UserGrantedAuthority {
  authorityType: AuthorityType
}

export interface UserDTO {
  id: string;
  name?: string;
  surname?: string;
  fullName?: string;
}

export interface TournamentCreatorConfig {
  accessOptions: string [];
  competitionTypes: CompetitionType [];
  systemTypes: { [key: string]: string [] };
  participantTypes: { [key: string]: string [] };
}

export interface TranslatableValue<T> {
  value: T;
  translationKey: string;
}

export interface Tuple2<LEFT, RIGHT> {
  left: LEFT | any;
  right: RIGHT | any;
}

export interface Profile {
  id: string;
}

export interface TournamentParticipantDTO extends Profile {
  firstName: string;
  secondName: string;
  name: string;
  fullName: string;
  email: string;
  participantStatus: string;
  invitationStatus: InvitationStatus;
}

export interface TournamentDTO {
  id: string;
  name: string;
  description: string;
  place: string;
  img: string;
  status: TournamentStatus;
  accessOption: string;
  participants: TournamentParticipantDTO [];
  owner: Profile;
  startDate: Date;
  endDate: Date;
  systemType: TournamentSystemType;
  competitionType: string;
  tournamentParticipantType: string;
  staffIds: string [];
  contributorsIds: string [];
  minParticipants: number;
  maxParticipants: number;
  currentRound: number;
  winner: TournamentParticipantDTO;
  nextOpponent: TournamentParticipantDTO;
  plannedRounds: number;
  invitationToken?: string;
}


export interface ScheduleDto {
  tournamentId: string;
  round: number;
  elements: ScheduleElementDto [];
}

export interface ScheduleElementDto {
  gameId: string;
  startDate: string;
  endDate: string;
  shortDate: string;
  homeTeam: TeamDto;
  awayTeam: TeamDto;
  bye: boolean;
  gameStatus: GameStatus;
}

export interface TeamDto {
  id: string;
  name: string;
  membersIds: string [];
}


export enum GameStatus {
  BEFORE_START = 'GAME_STATUS.BEFORE_START',
  IN_PROGRESS = 'GAME_STATUS.IN_PROGRESS',
  ENDED = 'GAME_STATUS.ENDED',
}

export interface TournamentTableDTO {
  tournamentId: string;
  rows: TournamentTableRowDTO [];
}

export interface TournamentTableRowDTO {
  baseOrderNum: number;
  teamId: string;
  name: string;
  draws: number;
  wins: number;
  loses: number;
  points: number;
  totalGames: number;
  smallPoints: number;
}

export enum SwissTournamentTableColumns {
  POSITION = 'SWISS_TOURNAMENT_COLUMN.POSITION',
  FULL_NAME = 'SWISS_TOURNAMENT_COLUMN.FULL_NAME',
  POINTS = 'SWISS_TOURNAMENT_COLUMN.POINTS',
  WINS = 'SWISS_TOURNAMENT_COLUMN.WINS',
  DRAWS = 'SWISS_TOURNAMENT_COLUMN.DRAWS',
  LOSES = 'SWISS_TOURNAMENT_COLUMN.LOSES',
  SMALL_POINTS = 'SWISS_TOURNAMENT_COLUMN.SMALL_POINTS',
}

export interface Cache<T> {
  expirationDate: Date;
  value: T;
}

export interface UserTournamentsDTO {
  tournaments: { [key: string]: TournamentDTO []; };
}

export enum CompetitionType {
  CHESS = 'COMPETITION_TYPE.CHESS'
}

export const ACCESS_OPTION = {
  PUBLIC: 'ACCESS_OPTION.PUBLIC',
  PRIVATE: 'ACCESS_OPTION.PRIVATE'
};

// export const TOURNAMENT_SYSTEM_TYPE = {
//   SWISS: 'TOURNAMENT_SYSTEM_TYPE.SWISS'
// };

export enum TournamentSystemType {
  SWISS = 'TOURNAMENT_SYSTEM_TYPE.SWISS'
}

export const TOURNAMENT_PARTICIPANT_TYPE = {
  SINGLE: 'TOURNAMENT_PARTICIPANT_TYPE.SINGLE',
  TEAM: 'TOURNAMENT_PARTICIPANT_TYPE.TEAM'
};

export const enum TournamentStatus {
  BEFORE_START = 'TOURNAMENT_STATUS.BEFORE_START',
  IN_PROGRESS = 'TOURNAMENT_STATUS.IN_PROGRESS',
  ENDED = 'TOURNAMENT_STATUS.ENDED'
}

export const PARTICIPANT_STATUS = {
  ACTIVE: 'PARTICIPANT_STATUS.ACTIVE',
  DISQUALIFIED: 'PARTICIPANT_STATUS.DISQUALIFIED',
  RESIGNED: 'PARTICIPANT_STATUS.RESIGNED',
  INVITED: 'PARTICIPANT_STATUS.INVITED'
};


export const enum AuthorityType {
  CLI = "AUTHORITY_TYPE.CLI",
}

export const enum InvitationStatus {
  ACCEPTED = "INVITATION_STATUS.ACCEPTED",
  INVITED = "INVITATION_STATUS.DISQUALIFIED",
  PARTICIPATION_REQUEST = "INVITATION_STATUS.PARTICIPATION_REQUEST",
  REJECTED = "INVITATION_STATUS.REJECTED"
}

export const enum TournamentTableColumnType {
  LP = 'COLUMN_TYPE.LP',
  NAME = 'COLUMN_TYPE.NAME',
  WINS = 'COLUMN_TYPE.WINS',
  LOSES = 'COLUMN_TYPE.LOSES',
  DRAWS = 'COLUMN_TYPE.DRAWS',
  POINTS = 'COLUMN_TYPE.POINTS',
  TOTAL_GAMES = 'COLUMN_TYPE.TOTAL_GAMES',
  SMALL_POINTS = 'COLUMN_TYPE.SMALL_POINTS'
}