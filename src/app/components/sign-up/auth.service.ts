import {Injectable,inject} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "@angular/fire/auth";
import {User} from "./user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn:"root"
})

export class AuthService{
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);
  login2 = false
  getAuth(){

    return getAuth();
  }

  signup(user:User){
    console.log("ola");


    return createUserWithEmailAndPassword(getAuth(),user.email,user.password);


  }

  login(user:User){
    this.login2 = true
    return signInWithEmailAndPassword(getAuth(),user.email,user.password);

  }
  /*
  login(user:User){


    try {

      signInWithEmailAndPassword(getAuth(),user.email,user.password);
      this.login2 = true

    }catch (error){
      this.login2 = false
    }
  }
  */
  getLogin(){
    return this.login2
  }

  signout(){
    this.login2 = false;
    return signOut(getAuth());
  }

}
