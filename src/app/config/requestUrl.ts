import {environment} from '../../environments/environment';

export const RequestUrl = {
  login: environment.apiUrl + '/auth/login',
  register: environment.apiUrl + '/auth/register',
  forgetPassword: environment.apiUrl + '/auth/forget-password',

  search: {
    tournament: environment.apiUrl + '/search?tournament=',
    user: environment.apiUrl + '/search/user?q='
  },

  userSettings: {
    authority: environment.apiUrl + '/userSettings/authority',
    config: environment.apiUrl + '/userSettings/config'
  },

  tournamentCreator: {
    config: environment.apiUrl + '/tournamentCreator/config',
    create: environment.apiUrl + '/tournamentCreator/create'
  },

  tournament: {
    tournament: environment.apiUrl + '/tournaments/',
    user: environment.apiUrl + '/tournaments?userId=',
  },

  cli: environment.apiUrl + '/cli/',

  helloWorld: environment.apiUrl + '/hello-world',
};
