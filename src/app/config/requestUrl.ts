import {environment} from '../../environments/environment';

export const RequestUrl = {

  auth: {
    login: environment.apiUrl + '/auth/login',
    register: environment.apiUrl + '/auth/register',
    forgetPassword: environment.apiUrl + '/auth/forget-password',
    active: environment.apiUrl + '/auth/active?email='
  },

  search: {
    tournament: environment.apiUrl + '/search?tournament=',
    user: environment.apiUrl + '/search/user?q='
  },

  userSettings: {
    authority: environment.apiUrl + '/userSettings/authority',
    config: environment.apiUrl + '/userSettings/config',
    password: environment.apiUrl + '/userSettings/password',
    email: environment.apiUrl + '/userSettings/email'
  },

  tournamentCreator: {
    config: environment.apiUrl + '/tournamentCreator/config',
    create: environment.apiUrl + '/tournamentCreator/create'
  },

  tournament: {
    tournament: environment.apiUrl + '/tournaments/',
    user: environment.apiUrl + '/tournaments?userId=',
  },

  verification: {
    emailChange: environment.apiUrl + "/verification/email?token=",
    newAccount: environment.apiUrl + "/verification/account?token=",
    resetPassword: environment.apiUrl + "/verification/password?token="
  },

  cli: environment.apiUrl + '/cli/',

  helloWorld: environment.apiUrl + '/hello-world',
};
