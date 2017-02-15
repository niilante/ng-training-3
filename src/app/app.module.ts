import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {FirebaseTestComponent} from './firebase-test/firebase-test.component';
import {Auth0Component} from './auth0/auth0.component';
import {AuthService} from "./auth0/auth.service";
import {firebaseConfig} from './firebase-config.const';
import {AUTH_PROVIDERS} from "angular2-jwt";

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        FirebaseTestComponent,
        Auth0Component
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [AuthService, AUTH_PROVIDERS],
    bootstrap: [AppComponent]
})

export class AppModule {
}
