import {UserService} from './user.service';
import {AppUser} from './../models/app-user';
import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { firebase } from '@firebase/app';
import {Router} from '@angular/router';
@Injectable()
export class AuthService {
  user$: Observable<AppUser>;
  userId: string;
  provider = new firebase.auth.GoogleAuthProvider();
  isAdmin: boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router, private fbAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = fbAuth.authState.switchMap(user => {
      if (!user) return Observable.of(null);
      return this.userService.get(user.uid);
    });
  }

  loginGoogle(): any {
    this.afAuth.auth.signInWithPopup(this.provider).then(
      (result) => {
        //     console.log('user uid is ' + result.user.uid);
        this.userService.save(result.user);
        this.userId = result.user.uid;

        this.userService.get(result.user.uid).subscribe(
          (data) => {
            //       console.log(data);
            if ((data) && (data.isAdmin)) {
              this.isAdmin = true;
              this.router.navigate(['']);
              console.log('YOU ARE ADMIN');
            } else {
              this.isAdmin = false;
              this.router.navigate(['']);
            }
          }
        );

      });
  }
  loginFacebook(): Promise<boolean> {
    return new Promise(resolve => {
      this.fbAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
        (result) => {
          this.userService.save(result.user);
          resolve(true);
        }
      );
    });
  }

  logout(): Promise<boolean> {
    return new Promise(
      (resolve) => this.fbAuth.auth.signOut().then(
        () => resolve(true)
      )
    );
  }
}
