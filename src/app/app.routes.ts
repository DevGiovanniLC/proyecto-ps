import { Routes } from '@angular/router';

import { WhoweareComponent } from './whoweare-page/whoweare.component';
import { LogInComponent } from "./components/log-in/log-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { AppComponent } from "./home-page/app.component";

export const routes: Routes = [


	{ path: 'whoweare', component: WhoweareComponent },

  {path:"login",component:LogInComponent},

  {path:"signup",component:SignUpComponent},

];
