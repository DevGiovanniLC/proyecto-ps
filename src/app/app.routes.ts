import { Routes } from '@angular/router';

import { WhoweareComponent } from './whoweare-page/whoweare.component';
import { LogInComponent } from "./components/auth/log-in/log-in.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { ForgotpasswordComponent } from "./components/auth/forgotpassword/forgotpassword.component";
import { FormatPageComponent } from './format-page/format-page.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    { path: 'home', loadComponent: () => HomePageComponent },
    { path: 'whoweare', loadComponent: () => WhoweareComponent },
    { path: "login", loadComponent: () => LogInComponent },
    { path: "signup", loadComponent: () => SignUpComponent },
    {path: "formatconverter", loadComponent: () => FormatPageComponent},
    { path: "forgotpassword", loadComponent: () => ForgotpasswordComponent },
];
