import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  afterNextRender,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [AuthService],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public error: string = '';
  public loading: boolean = false;
  public appname: string = '';
  private sub: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    //this.loginRoute = '';
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    this.error = '';
    if (this.loginForm.invalid) {
      return;
    }
    const appname = this.appname;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    console.log(appname, username, password);

    this.loading = true;
    this.authService.login(appname, username, password);
  }

  ngOnInit(): void {
    this.sub.add;
    this.appname = this.getAppnameFromUrl();
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.appname = params.get('appname') ?? '';
    //   console.log(this.appname);
    //   // this.appname = params.get('appname');
    // });
    // this.route.params.subscribe((params) => {
    //   debugger;
    //   this.appname = this.route.snapshot.queryParams['appname'];
    //   console.log(this.appname);
    //   console.log(params);
    // });

    //   this.route.params.subscribe((params) => {
    //     this.appname = this.route.snapshot.queryParams['appname'];
    //     console.log(this.appname);
    //     console.log(params);
    //     console.log(window.location);
    //   })
    // );
    this.sub.add(
      this.authService.getLoginError$().subscribe((error: string) => {
        this.error = error;
        this.loading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  // ngAfterViewInit(): void {
  //   this.route.firstChild?.params.subscribe((params) => {
  //     this.appname = params['id'];
  //     console.log(params);
  //     console.log(this.appname);
  //   });
  // }
  private getAppnameFromUrl(): any {
    this.route.paramMap.subscribe((params: ParamMap) => {
      debugger;
    });
    // const url = window.location.href;
    // const parts = url.split('/');
    // Assuming the appname is in the second segment of the URL
    // return parts[parts.length - 1];
  }
}
