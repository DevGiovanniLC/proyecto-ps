import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "../sign-up/user.model";
import { AuthService } from "../../../services/AuthService.service";
import { HttpClient } from "@angular/common/http";
import { TranslationService } from "../../../../translation";


@Component({
	selector: 'app-log-in',
	standalone: true,
	imports: [RouterLink, FormsModule, ReactiveFormsModule
	],
	templateUrl: './log-in.component.html',
	styleUrl: './log-in.component.css'
})

export class LogInComponent implements OnInit {

	firebaseService = inject(AuthService);
	login1 = false;
	jsonData: any;
	selectedLanguage: string;
	menuItems: string[] = ['', '', ''];

	constructor(private translation: TranslationService, private http: HttpClient, private router: Router) {
		this.selectedLanguage = localStorage.getItem('selectedLanguage');
	}

	async ngOnInit() {
        this.jsonData = await this.http.get<any>("../../../../assets/i18n/log_in.json").toPromise();
        
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
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required]),

	})

	errorPassword() {
		const emailError = document.getElementById("passwordreg-error")
		emailError.textContent = '';
		emailError.style.display = 'none';

		emailError.textContent = "Correo electrónico o contraseña incorrectos";
		emailError.style.display = 'block';
	}


	async submit() {

		try {
			await this.firebaseService.login(this.form.value as User);
			this.firebaseService.changestatus();
			this.router.navigate([""])
			this.login1 = true;
		} catch (error) {
			const x = error.code
			if (x == 'auth/invalid-credential') {
				this.errorPassword();
				console.error("CLAVE INVALIDA");
			} else {
				console.error("el error es:" + x);
			}
		}
	}

    googlesignin() {
        this.firebaseService.googlesignin();
    }


}
