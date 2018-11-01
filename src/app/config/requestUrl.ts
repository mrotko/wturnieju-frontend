import {environment} from '../../environments/environment';

export const RequestUrl = {
  login: environment.apiUrl + '/auth/login',
  register: environment.apiUrl + '/auth/register',
  forgetPassword: environment.apiUrl + '/auth/forget-password',

  tournamentCreator: {
    config: environment.apiUrl + '/tournamentCreator/config',
    create: environment.apiUrl + '/tournamentCreator/create'
  },

  helloWorld: environment.apiUrl + '/hello-world',
};
