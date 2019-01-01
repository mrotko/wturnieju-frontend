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
  status: string;
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


export interface TournamentBundleUpdate {
  timestamp: Date;
  changedBy: Profile;
  tournamentId: string;
  tournamentSystemType: TournamentSystemType;
  content: StartTournamentBundleUpdateContent | EndTournamentBundleUpdateContent;
}


export interface StartTournamentBundleUpdateContent {
  startDate: Date;
  type: TournamentBundleUpdateContentType;
}

export interface EndTournamentBundleUpdateContent {
  endDate: Date;
  type: TournamentBundleUpdateContentType;
}


export interface FixtureDTO {
  id: string;
  timestamp: Date;
  playersIds: Tuple2<string, string>;
  result?: Tuple2<number, number>;
  winnerId: string;
  status: FixtureStatus;
  competitionType: CompetitionType;
  round: number;
}

export enum FixtureStatus {
  BEFORE_START = 'FIXTURE_STATUS.BEFORE_START',
  IN_PROGRESS = 'FIXTURE_STATUS.IN_PROGRESS',
  ENDED = 'FIXTURE_STATUS.ENDED',
  // DELAYED = 'FIXTURE_STATUS.DELAYED',
  // FIRST_PLAYER_WON = 'FIXTURE_STATUS.FIRST_PLAYER_WON',
  // FIRST_PLAYER_WON_WALKOVER = 'FIXTURE_STATUS.FIRST_PLAYER_WON_WALKOVER',
  // SECOND_PLAYER_WON = 'FIXTURE_STATUS.SECOND_PLAYER_WON',
  // SECOND_PLAYER_WON_WALKOVER = 'FIXTURE_STATUS.SECOND_PLAYER_WON_WALKOVER',
  // DRAW = 'FIXTURE_STATUS.DRAW'
}

export interface TournamentTableDTO {
  rows: TournamentTableRowDTO [];
}

export interface TournamentTableRowDTO {
  position: number;
  profile: Profile;
  points: number;
  wins: number;
  draws: number;
  loses: number;
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

export interface RoundToFixturesDTO {
  round: number;
  fixtures: FixtureDTO[];
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

export const TOURNAMENT_STATUS = {
  BEFORE_START: 'TOURNAMENT_STATUS.BEFORE_START',
  IN_PROGRESS: 'TOURNAMENT_STATUS.IN_PROGRESS',
  ENDED: 'TOURNAMENT_STATUS.ENDED',
};

export const PARTICIPANT_STATUS = {
  ACTIVE: 'PARTICIPANT_STATUS.ACTIVE',
  DISQUALIFIED: 'PARTICIPANT_STATUS.DISQUALIFIED',
  RESIGNED: 'PARTICIPANT_STATUS.RESIGNED',
  INVITED: 'PARTICIPANT_STATUS.INVITED'
};


export const enum TournamentBundleUpdateContentType {
  START = 'TOURNAMENT_BUNDLE_UPDATE_CONTENT_TYPE.START',
  NEXT_ROUND = 'TOURNAMENT_BUNDLE_UPDATE_CONTENT_TYPE.NEXT_ROUND',
  PAUSE = 'TOURNAMENT_BUNDLE_UPDATE_CONTENT_TYPE.PAUSE',
  END = 'TOURNAMENT_BUNDLE_UPDATE_CONTENT_TYPE.END'
}

export const enum AuthorityType {
  CLI = "AUTHORITY_TYPE.CLI",
}

export const enum InvitationStatus {
  ACCEPTED = "INVITATION_STATUS.ACCEPTED",
  INVITED = "INVITATION_STATUS.DISQUALIFIED",
  PARTICIPATION_REQUEST = "INVITATION_STATUS.PARTICIPATION_REQUEST",
  REJECTED = "INVITATION_STATUS.REJECTED"

}