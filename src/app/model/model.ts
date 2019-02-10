export interface TournamentTemplateDto {
  name: string;
  description: string;
  place: string;
  startDate: Date;
  endDate: Date;
  accessOption: AccessOption;
  maxParticipants: number;
  minParticipants: number;
  plannedRounds: number;
  competitionType: CompetitionType;
  invitationLink: boolean;
  systemType: TournamentSystemType;
  participantType: ParticipantType;
  tableColumns: TournamentTableColumnType []
  scoring: { [key: string]: number }
  stageTypes: StageType []
  requiredAllGamesEndedStageTypes: StageType [];
  periodsConfig: PeriodsConfigDto;
  positionOrder: PositionOrderElementType [];
}

export interface SearchResultDto<T> {
  data: T [];
}

export interface TournamentSearchDto {
  tournamentId: string;
  tournamentName: string;
}

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
  username?: string;
}

export interface TournamentCreatorConfigDto {
  creator: TournamentCreatorConfig;
  scoring: ScoringConfig [];
}

export interface TournamentCreatorConfig {
  accessOptions: AccessOption [];
  competitionTypes: CompetitionType [];
  systemTypes: { [key: string]: TournamentSystemType [] };
  participantTypes: { [key: string]: ParticipantType [] };
  columnTypes: { [key: string]: TournamentTableColumnType []; }
  stageTypes: { [key: string]: StageType [] }
  requiredAllGamesEndedStageTypesMapping: { [key: string]: StageType [] }
  competitionTypeToGamePeriodsConfigMapping: { [key: string]: PeriodsConfigDto [] }
  systemTypeToPositionOrderMapping: { [key: string]: PositionOrderElementType [] }
}

export interface ScoringConfig {
  competitionType: CompetitionType;
  tournamentSystems: ScoringSystemTypeConfig [];
}

export interface ScoringSystemTypeConfig {
  tournamentSystemType: TournamentSystemType;
  gameResults: ScoringGameResultConfig [];
}

export interface ScoringGameResultConfig {
  gameResultType: GameResultType;
  points: number;
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

export interface GameEventDto {
  tournamentId: string;
  gameId: string;
  competitionType: CompetitionType;
  gameEventType: GameEventType;
}

export interface ParticipantEventDto extends GameEventDto {
  participantId: string;
}

export interface StartGameEventDto extends GameEventDto {
  startDate: Date;
}

export interface FinishGameEventDto extends GameEventDto {
  finishedDate: Date;
  homeScore?: ScoreDto;
  awayScore?: ScoreDto;
  winner: number;
}

export interface ParticipantDTO extends Profile {
  name: string;
  shortName: string;
  participantStatus: ParticipantStatus;
  invitationStatus: InvitationStatus;
  participantType: ParticipantType;
  members: MemberDto [];
}

export interface MemberDto {
  userId: string;
  name: string;
}

export interface GameFixtureDto {
  id: string;
  groupId: string;
  tournamentId: string;
  previousGameId: string;
  startDate: Date;
  endDate: Date;
  finishedDate: Date;
  homeParticipant: ParticipantDTO;
  homeScore: ScoreDto;
  awayParticipant: ParticipantDTO;
  awayScore: ScoreDto;
  gameStatus: GameStatus;
  winner: number;
  round: number;
  bye: boolean;
  live: boolean;
  legType: LegType;
  stageType: StageType;
  accessOption: AccessOption;
  competitionType: CompetitionType;
  homeSmallPoints: number;
  awaySmallPoints: number;
  periodsConfig: PeriodsConfigDto;
}

export interface TournamentDTO {
  id: string;
  name: string;
  description: string;
  place: string;
  img: string;
  status: TournamentStatus;
  accessOption: AccessOption;
  participants: ParticipantDTO [];
  owner: Profile;
  startDate: Date;
  endDate: Date;
  systemType: TournamentSystemType;
  competitionType: CompetitionType;
  participantType: ParticipantType;
  staffIds: string [];
  contributorsIds: string [];
  minParticipants: number;
  maxParticipants: number;
  currentRound: number;
  currentStageType: StageType;
  stageTypes: StageType [];
  winner: ParticipantDTO;
  nextOpponent: ParticipantDTO;
  plannedRounds: number;
  scoring: { [key: string]: number }
  invitationToken?: string;
  groups: GroupDto [];
  tableColumns: TournamentTableColumnType [];
  periodsConfig: PeriodsConfigDto;
  positionOrder: PositionOrderElementType [];
}

export interface PeriodsConfigDto {
  periodsNumber: number;
  requiredPeriodsNumber: number;
}

export interface GroupDto {
  id: string;
  name: string;
  tournamentId: string;
  participants: ParticipantDTO [];
  stageType: StageType;
  requiredAllGamesEnded: boolean;
}

export interface ScheduleDto {
  tournamentId: string;
  tournamentName?: string;
  round?: number;
  elements: ScheduleElementDto [];
}

export interface ScheduleElementDto {
  gameId: string;
  startDate: Date;
  endDate?: Date;
  shortDate: boolean;
  homeParticipant: ParticipantDTO;
  homeScore?: ScoreDto;
  awayParticipant?: ParticipantDTO;
  awayScore?: ScoreDto
  winner: number,
  bye: boolean;
  gameStatus: GameStatus;
}

export interface ScoreDto {
  current: number;
  periods: { [key: number]: number };
}

export enum GameStatus {
  BEFORE_START = 'GAME_STATUS.BEFORE_START',
  IN_PROGRESS = 'GAME_STATUS.IN_PROGRESS',
  ENDED = 'GAME_STATUS.ENDED',
}

export interface TournamentTableDTO {
  groupId: string;
  name: string;
  rows: TournamentTableRowDTO [];
}

export interface TournamentTableRowDTO {
  baseOrderNum: number;
  participantId: string;
  name: string;
  draws: number;
  wins: number;
  loses: number;
  points: number;
  totalGames: number;
  smallPoints: number;
}

export interface AuthConfigDto {
  passwordPatternGroups: PasswordPatternGroup [];
}

export interface PasswordPatternGroup {
  patternGroupType: PasswordPatternGroupType;
  pattern: string;
}

export const enum PasswordPatternGroupType {
  BIG_LETTER = "PASSWORD_PATTERN_GROUP_TYPE.BIG_LETTER",
  SMALL_LETTER = "PASSWORD_PATTERN_GROUP_TYPE.SMALL_LETTER",
  NUMBER = "PASSWORD_PATTERN_GROUP_TYPE.NUMBER",
  LENGTH_8 = "PASSWORD_PATTERN_GROUP_TYPE.LENGTH_8",
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
  CHESS = 'COMPETITION_TYPE.CHESS',
  FOOTBALL = 'COMPETITION_TYPE.FOOTBALL',
  TENNIS = 'COMPETITION_TYPE.TENNIS',
  CUSTOM = 'COMPETITION_TYPE.CUSTOM',
}

export const enum AccessOption {
  PUBLIC = 'ACCESS_OPTION.PUBLIC',
  PRIVATE = 'ACCESS_OPTION.PRIVATE'
}

export const enum TournamentSystemType {
  SWISS = 'TOURNAMENT_SYSTEM_TYPE.SWISS',
  KNOCKOUT = 'TOURNAMENT_SYSTEM_TYPE.KNOCKOUT',
  GROUP = 'TOURNAMENT_SYSTEM_TYPE.GROUP',
  LEAGUE = 'TOURNAMENT_SYSTEM_TYPE.LEAGUE',
  ROUND_ROBIN = 'TOURNAMENT_SYSTEM_TYPE.ROUND_ROBIN',
}

export const enum ParticipantType {
  SINGLE = 'PARTICIPANT_TYPE.SINGLE',
  TEAM = 'PARTICIPANT_TYPE.TEAM'
}

export const enum TournamentStatus {
  BEFORE_START = 'TOURNAMENT_STATUS.BEFORE_START',
  IN_PROGRESS = 'TOURNAMENT_STATUS.IN_PROGRESS',
  ENDED = 'TOURNAMENT_STATUS.ENDED'
}

export const enum ParticipantStatus {
  ACTIVE = 'PARTICIPANT_STATUS.ACTIVE',
  DISQUALIFIED = 'PARTICIPANT_STATUS.DISQUALIFIED',
  RESIGNED = 'PARTICIPANT_STATUS.RESIGNED',
  INVITED = 'PARTICIPANT_STATUS.INVITED'
}

export const enum AuthorityType {
  CLI = "AUTHORITY_TYPE.CLI",
}

export const enum InvitationStatus {
  ACCEPTED = "INVITATION_STATUS.ACCEPTED",
  INVITED = "INVITATION_STATUS.INVITED",
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

export const enum GameEventType {
  GAME_START = 'GAME_EVENT_TYPE.GAME_START',
  GAME_FINISHED = 'GAME_EVENT_TYPE.GAME_FINISHED'
}

export const enum GameResultType {
  WIN = "GAME_RESULT_TYPE.WIN",
  DRAW = "GAME_RESULT_TYPE.DRAW",
  LOSE = "GAME_RESULT_TYPE.LOSE"
}

export const enum StageType {
  GROUP = "STAGE_TYPE.GROUP",
  KNOCKOUT = "STAGE_TYPE.KNOCKOUT",
  LEAGUE = "STAGE_TYPE.LEAGUE",
}

export const enum LegType {
  FIRST = "LEG_TYPE.FIRST",
  SECOND = "LEG_TYPE.SECOND"
}

export const enum FootballPeriodType {
  FIRST_HALF = "FOOTBALL_PERIOD_TYPE.FIRST_HALF",
  SECOND_HALF = "FOOTBALL_PERIOD_TYPE.SECOND_HALF",
}

export const enum TennisPeriodType {
  FIRST_SET = "TENNIS_PERIOD_TYPE.FIRST_SET",
  SECOND_SET = "TENNIS_PERIOD_TYPE.SECOND_SET",
  THIRD_SET = "TENNIS_PERIOD_TYPE.THIRD_SET",
}

export const enum PositionOrderElementType {
  POINTS = "POSITION_ORDER_ELEMENT_TYPE.POINTS",
  SMALL_POINTS = "POSITION_ORDER_ELEMENT_TYPE.SMALL_POINTS",
  WINS = "POSITION_ORDER_ELEMENT_TYPE.WINS",
  DRAWS = "POSITION_ORDER_ELEMENT_TYPE.DRAWS",
}