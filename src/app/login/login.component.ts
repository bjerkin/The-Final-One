import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from './../services/auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  loginGoogle() {
    // const redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // this.auth.loginGoogle().then((result) => {
    //   this.router.navigateByUrl(redirectUrl);
    // });
    this.auth.loginGoogle();
  }

  loginFacebook() {
    const redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.auth.loginFacebook().then((result) => {
      this.router.navigateByUrl(redirectUrl);
    });
  }
}
