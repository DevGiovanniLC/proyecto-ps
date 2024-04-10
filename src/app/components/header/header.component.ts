import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LogInComponent } from "../log-in/log-in.component";
import firebase from "firebase/compat";
import { AuthService } from "../sign-up/auth.service";



@Component({
	selector: 'header',
	standalone: true,
	imports: [RouterLink, LogInComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent {

  firebaseService = inject(AuthService);


  getlog():boolean{
    return this.firebaseService.getLogin()
  }

  getout(){
    return this.firebaseService.signout()
  }

  boton(){
    this.getout();
  }






}
