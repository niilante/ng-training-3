import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {Http} from "@angular/http";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    displayName;
    photoURL;
    error;

    constructor(private af: AngularFire, private http: Http) {
    }

    ngOnInit() {
        this.af.auth.subscribe(authState => {
            
        });
        // FACEBOOK
        /*this.af.auth.subscribe(authState => {
            if (authState) {
                this.displayName = authState.auth.displayName;
                this.photoURL = authState.auth.photoURL;

                let userRef = this.af.database.object('/users/' + authState.uid);
                userRef.subscribe(user => {
                    console.log(authState);
                    let url = `https://graph.facebook.com/v2.8/${authState.facebook.uid}?fields=first_name,last_name&access_token=${user.accessToken}`;
                    this.http.get(url).subscribe(response => {
                        let user = response.json();
                        userRef.update({
                            firstName: user.first_name,
                            lastName: user.last_name
                        })
                    })
                });


                return;
            }

        });*/
        // END FACEBOOK
    }

    register() {
        this.af.auth.createUser({
            email: 'francois.arki@strategieone.agency',
            password: '123456'
        }).then( authState => {

            authState.auth.sendEmailVerification();

        }).catch(error => {
            console.error('ERROR REGISTER', error);
        })
    }
    loginEmail() {
        this.af.auth.login({
            email: 'francois.arki@strategieone.agency',
            password: '1234567'
        }, {
            method: AuthMethods.Password,
            provider: AuthProviders.Password
        })
            .then(authState => console.log('LOGIN EMAIL', authState))
            .catch(authState => this.error = authState.message)
    }
    logInFacebook() {
        this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup,
            scope: ['public_profile', 'user_friends']
        }).then((authState: any) => {
            this.af.database.object('/users/' + authState.uid)
                .update({
                    accessToken: authState.facebook.accessToken
                });
            console.log('AFTER LOGIN', authState);

        })
    }

    logOutFacebook() {
        this.af.auth.logout()
            .then(() => {
                this.displayName = null;
                this.photoURL = null;

            });
    }

}
