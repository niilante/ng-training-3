import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {AuthHttp} from 'angular2-jwt';

@Component({
    selector: 'app-auth0',
    templateUrl: './auth0.component.html',
    styleUrls: ['./auth0.component.css']
})
export class Auth0Component implements OnInit {

    constructor(private auth: AuthService, private authHttp: AuthHttp) {
    }

    ngOnInit() {
    }

    login() {
        this.auth.login();
    }

    logout() {
        this.auth.logout();
    }

    showProfile() {
        console.log(this.auth.userProfile);
    }

    updateProfile() {
        let url = 'https://azkeel.eu.auth0.com/api/v2/users/' + this.auth.userProfile.user_id;
        let data = {
            user_metadata: {
                location: 'Melbourne'
            }
        };
        this.authHttp.patch(url, data)
            .subscribe(resp => console.log(resp.json()));
    }

    callAPI() {
        this.authHttp.get('http://localhost:8080/authorized')
            .subscribe(res => console.log('CALL API', res));
    }

}
