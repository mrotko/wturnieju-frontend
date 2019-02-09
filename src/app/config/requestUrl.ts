import {environment} from '../../environments/environment';

export const RequestUrl = {

  auth: {
    login: environment.apiUrl + '/auth/login',
    register: environment.apiUrl + '/auth/register',
    forgetPassword: environment.apiUrl + '/auth/forget-password',
    active: environment.apiUrl + '/auth/active?email=',
    config: environment.apiUrl + '/auth/config'
  },

  search: {
    tournament: environment.apiUrl + '/search/tournament',
    user: environment.apiUrl + '/search/user?q='
  },

  userSettings: {
    authority: environment.apiUrl + '/userSettings/authority',
    config: environment.apiUrl + '/userSettings/config',
    password: environment.apiUrl + '/userSettings/password',
    email: environment.apiUrl + '/userSettings/email',
    personalData: environment.apiUrl + '/userSettings/personal'
  },

  tournamentCreator: {
    config: environment.apiUrl + '/tournamentCreator/config',
    create: environment.apiUrl + '/tournamentCreator/create'
  },

  tournament: {
    tournament: environment.apiUrl + '/tournaments/',
    user: environment.apiUrl + '/tournaments?userId=',
    fixtures: environment.apiUrl + '/tournaments/schedule',
  },

  gameEditor: {
    startGame: environment.apiUrl + '/game-editor/start-game',
    finishGame: environment.apiUrl + '/game-editor/finish-game'
  },

  verification: {
    emailChange: environment.apiUrl + "/verification/email?token=",
    newAccount: environment.apiUrl + "/verification/account?token=",
    resetPassword: environment.apiUrl + "/verification/password?token=",
    checkToken: environment.apiUrl + "/verification/checkToken?token={1}&service={2}",
    tournamentInvitation: environment.apiUrl + "/verification/tournament-invitation?token=",
    tournamentParticipationRequest: environment.apiUrl + "/verification/tournament-participation-request?token="
  },

  schedule: {
    schedule: environment.apiUrl + "/schedule"
  },

  cli: environment.apiUrl + '/cli/',

  helloWorld: environment.apiUrl + '/hello-world',
};
