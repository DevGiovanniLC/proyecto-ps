import { Routes } from '@angular/router';

import { WhoweareComponent } from './whoweare-page/whoweare.component';
import { LogInComponent } from "./components/auth/log-in/log-in.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { ForgotpasswordComponent } from "./components/auth/forgotpassword/forgotpassword.component";
import { HomePageComponent } from './home-page/home-page.component';
import { FormatconverterPageComponent } from './formatconverter-page/formatconverter-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import {
  PrevisualitionOptionDialogComponent
} from "./components/features/previsualition-option-dialog/previsualition-option-dialog.component";
import { MyRecordsComponent } from './my-records/my-records.component';

export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    { path: 'home', loadComponent: () => HomePageComponent },
    { path: 'whoweare', loadComponent: () => WhoweareComponent },
    { path: "login", loadComponent: () => LogInComponent },
    { path: "signup", loadComponent: () => SignUpComponent },
    { path: "formatconverter", loadComponent: () => FormatconverterPageComponent },
    { path: "forgotpassword", loadComponent: () => ForgotpasswordComponent },
    { path: 'review', loadComponent: () => ReviewPageComponent },
    { path: "option",component:PrevisualitionOptionDialogComponent},
    { path: "myrecords",component:MyRecordsComponent},
];  
