import {environment} from '../../environments/environment';

export const RequestUrl = {
  login: environment.apiUrl + '/auth/login',
  register: environment.apiUrl + '/auth/register',
  forgetPassword: environment.apiUrl + '/auth/forget-password',

  tournamentCreator: {
    config: environment.apiUrl + '/tournamentCreator/config',
    create: environment.apiUrl + '/tournamentCreator/create'
  },

  tournament: {
    user: environment.apiUrl + '/tournaments?userId='
  },

  helloWorld: environment.apiUrl + '/hello-world',
};
