import {environment} from '../../environments/environment';

export const RequestUrl = {
  login: environment.apiUrl + '/auth/login',
  register: environment.apiUrl + '/auth/register',
  forgetPassword: environment.apiUrl + '/auth/forget-password',

  helloWorld: environment.apiUrl + '/hello-world',
}
