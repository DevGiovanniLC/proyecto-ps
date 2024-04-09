import {Injectable,inject} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getAuth,createUserWithEmailAndPassword} from "@angular/fire/auth";
import {User} from "./user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn:"root"
})

export class AuthService{
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);

  getAuth(){

    return getAuth();
  }

  signup(user:User){
    console.log("ola");


    return createUserWithEmailAndPassword(getAuth(),user.email,user.password);



  }

}
