import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { AuthAPI } from '../http/authAPI';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginError$: Subject<string> = new Subject();
  constructor(private http: HttpClient) {}

  public getLoginError$(): Observable<string> {
    return this.loginError$.asObservable();
  }
  public login(appname: string, user: string, password: string): void {
    const formData = new FormData();

    formData.append('appname', appname);
    formData.append('username', user);
    formData.append('password', password);
    const route = AuthAPI['login'];

    this.http.post(route, formData).subscribe(
      (data: any) => {
        console.log('login success', data);
        if (data.success) {
          const token = data.token;
          const redirectPath = data.redirectPath + '?token=' + token;
          (window as any).location = redirectPath;
        } else {
          if (data.error) {
            this.loginError$.next(data.error);
          } else if (data.msg) {
            this.loginError$.next(data.msg);
          } else {
            this.loginError$.next('Login Failed');
          }
        }
      },
      (error) => {
        throw new Error(error);
      }
    );
  }
}
