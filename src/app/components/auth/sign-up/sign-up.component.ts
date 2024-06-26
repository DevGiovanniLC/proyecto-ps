import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../services/AuthService.service";
import { CommonModule } from "@angular/common";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "./user.model";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { TranslationService } from "../../../../translation";

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [
        RouterLink, CommonModule, ReactiveFormsModule, FormsModule

    ],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

    firebaseService = inject(AuthService);
    jsonData: any;
	selectedLanguage: string;
	menuItems: string[] = ['', '', ''];

	constructor(private translation: TranslationService, private http: HttpClient, private router: Router) {
		this.selectedLanguage = localStorage.getItem('selectedLanguage');
	}

	async ngOnInit() {
        this.jsonData = await this.http.get<any>("../../../../assets/i18n/sign_in.json").toPromise();
        
        this.translateAll();    
    }

	translateAll() {
        
        localStorage.setItem('selectedLanguage', this.selectedLanguage);
        let values: string[] = Object.values(this.jsonData);
        
        

        values.forEach((text, index) => {
          this.translate(text, index);
          
        });
      }

    translate(text: string, index: number) {
        this.translation.translateText(text, this.selectedLanguage)
          .subscribe((response: any) => {
            this.menuItems[index] = response.data.translations[0].translatedText;
          }, (error) => {
            console.error('Error al traducir:', error);
          });
        }

    form = new FormGroup({
        username: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
        password1: new FormControl("", [Validators.required])
    })

    passwordlenght(valor: string): void {

        const passwordErrorDiv = document.getElementById("passwordreg-error")
        passwordErrorDiv.textContent = '';
        passwordErrorDiv.style.display = 'none';

        passwordErrorDiv.textContent = valor;
        passwordErrorDiv.style.display = 'block';

    }

    clean() {
        const passwordErrorDiv = document.getElementById("passwordreg-error")
        passwordErrorDiv.textContent = '';
        passwordErrorDiv.style.display = 'none';

    }
    emailBadly(): void {

        const emailError = document.getElementById("email-error")

        emailError.textContent = '';
        emailError.style.display = 'none';

        emailError.textContent = "Correo invalido.";
        emailError.style.display = 'block';


    }

    emailerrorr() {
        const emailError = document.getElementById("email-error")

        emailError.textContent = '';
        emailError.style.display = 'none';
        const x = document.getElementById("email") as HTMLInputElement


        const pattern = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
        const value = x.value;

        if (!pattern.test(value)) {
            return false
        } else
            return true;


    }

    emailUsed() {
        const emailError = document.getElementById("email-error")
        emailError.textContent = '';
        emailError.style.display = 'none';

        emailError.textContent = "El correo ya esta en uso.";
        emailError.style.display = 'block';

    }

    googlesignin() {
        this.firebaseService.googlesignin();
    }

    passwordverification(): string {

        const contrasena = this.form.get('password')!.value;
        const contrasena1 = this.form.get('password1')!.value;

        if (contrasena.length < 6) {


            return "La contraseña debe tener al menos 6 caracteres, un numero y un simbolo $@&"
        }
        const numero = /\d/.test(contrasena);
        const tieneSimbolo = /[!@#$%&*(),.?":{}|<>]/.test(contrasena);
        if (!numero || !tieneSimbolo) {
            return "La contraseña debe contener al menos un número y un símbolo $@&"
        }
        if (contrasena != contrasena1) {
            return "Las contraseñas no coinciden"
        }


        return ""



    }

    async submit() {
        const passwordError = this.passwordverification();
        if (this.emailerrorr()) {
            if (passwordError === "") {
                try {
                    await this.firebaseService.signup(this.form.value as User);
                    this.firebaseService.enviarCorreo()
                    window.alert("Usuario Creado");
                    this.router.navigate(["/login"])
                } catch (error) {
                    if (error.code == 'auth/email-already-in-use') {
                        this.emailUsed();
                    }

                }

            } else {
                this.passwordlenght(passwordError);

            }

        } else {
            this.emailBadly();
            this.clean()
            if (passwordError != "") {
                this.passwordlenght(passwordError);
            }
        }
    }
}


