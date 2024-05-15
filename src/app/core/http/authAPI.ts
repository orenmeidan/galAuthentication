import { environment } from '../../environments/environment';

export const AuthAPI: { [key: string]: any } = {
  login: `${environment.baseUrl}/authentication/validate`,
};
