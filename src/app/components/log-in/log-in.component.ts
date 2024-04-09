import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "../sign-up/user.model";
import { AuthService } from "../sign-up/auth.service";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  firebaseService = inject(AuthService);

  constructor(private router:Router) {
  }

  form = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required]),

  })


  async submit() {

          try {
            await this.firebaseService.login(this.form.value as User);
            this.router.navigate([""])
            console.log("Éxito");
          } catch (error) {
            const x = error.code
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario
          }


  }

}
