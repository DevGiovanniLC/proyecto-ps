import { Injectable, inject, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
    GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail
} from "@angular/fire/auth";
import { User } from "../components/auth/sign-up/user.model";
import { Router } from "@angular/router";
import firebase from "firebase/compat";
import { Observable } from 'rxjs';
import app = firebase.app;

@Injectable({
    providedIn: "root"
})

export class AuthService implements OnInit {
    auth = inject(AngularFireAuth);
    firestore = inject(AngularFirestore);
    router = inject(Router);
    login2 = false


    ngOnInit() {
        localStorage.setItem('isloogedIn', 'false');
    }

    getAuth() {
        return getAuth();
    }


    googlesignin() {

        signInWithPopup(getAuth(), new GoogleAuthProvider()).then(() => {
            localStorage.setItem('isloogedIn', 'true');
            this.router.navigate([""])

        }).catch()

    }
    enviarCorreo() {
        sendEmailVerification(getAuth().currentUser).then(() => {
        })
    }


    signup(user: User) {
        return createUserWithEmailAndPassword(getAuth(), user.email, user.password).then(Credential => {
            return this.firestore.collection('users').doc(Credential.user?.uid).set({
              username : user.username,
              email: user.email  
            })
        }).catch(error => {
            console.error('Error during sign up:', error);
        });
    }

    login(user: User) {
        this.login2 = true

        return signInWithEmailAndPassword(getAuth(), user.email, user.password);

    }
    changestatus() {
        localStorage.setItem('isloogedIn', 'true')
    }

    getLogin() {
        return this.login2
    }

    signout() {
        this.login2 = false;
        localStorage.setItem("isloogedIn", "false")
        const valor = localStorage.getItem("isloogedIn")
        return signOut(getAuth());
    }

    Forgotpassword(user: User) {
        sendPasswordResetEmail(getAuth(), user.email).then(() => {
            window.alert("password reset email send, check your inbox.")

        })
            .catch((error) => {
                window.alert(error)
            })
    }

    getUser(): Observable<firebase.User | null> {
        return this.auth.authState;
    }

    getUserDetails(uid: string): Observable<any> {
        return this.firestore.collection('users').doc(uid).valueChanges();
    }

}
