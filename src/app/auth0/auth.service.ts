import {Injectable} from '@angular/core';
import {tokenNotExpired} from "angular2-jwt";

declare let Auth0Lock: any;

@Injectable()
export class AuthService {

    lock = new Auth0Lock('WdataGEowO15IJldmQ3sbynw0Bxl8K6R', 'azkeel.eu.auth0.com', {
        auth: {
            params: {
                scope: 'openid profile',
                audience: 'https://api.pepper.com'
            }
        }
    });
    userProfile;

    constructor() {
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        this.lock.on('authenticated', authResult => {
            localStorage.setItem('id_token', authResult.accessToken);
            this.lock.getUserInfo(authResult.accessToken, (error, profile) => {

                if(error) {
                    console.error('error', error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });
        })

    }

    public login() {
        this.lock.show();
    }

    public isAuthenticated() {
        return tokenNotExpired();
    }

    public logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = null;
    }

}
