import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "./auth.service";
import { CommonModule } from "@angular/common";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "./user.model";



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,CommonModule,ReactiveFormsModule,FormsModule

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export  class SignUpComponent {

  firebaseService = inject(AuthService);



  form = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required]),
    password1: new FormControl("",[Validators.required])
  })




  coincidenClaves(): boolean {
    const passwordErrorDiv = document.getElementById("passwordreg-error")
    passwordErrorDiv.textContent = '';
    passwordErrorDiv.style.display = 'none';
    const contrasena = this.form.get('password')!.value;
    const contrasena1 = this.form.get('password1')!.value;

    if(contrasena === contrasena1){
      console.log("son la misma clave")
      return true
    }
    console.log("son distintas claves")

    passwordErrorDiv.textContent = "Las contraseñas no coinciden.";
    passwordErrorDiv.style.display = 'block';
    return false
  }

  passwordlenght():boolean{

    const passwordErrorDiv = document.getElementById("passwordreg-error")
    passwordErrorDiv.textContent = '';
    passwordErrorDiv.style.display = 'none';
    const contrasena = this.form.get('password')!.value;
    if(contrasena.length < 6){
      passwordErrorDiv.textContent = "La contraseña tiene menos de 6 caracteres.";
      passwordErrorDiv.style.display = 'block';
      return false

    }
    return true;



  }
  emailBadly():void{

    const emailError = document.getElementById("email-error")
    emailError.textContent = '';
    emailError.style.display = 'none';

    emailError.textContent = "Correo invalido.";
    emailError.style.display = 'block';


  }

  emailUsed(){
    const emailError = document.getElementById("email-error")
    emailError.textContent = '';
    emailError.style.display = 'none';

    emailError.textContent = "El correo ya esta en uso.";
    emailError.style.display = 'block';

  }



  async submit() {
    if(this.passwordlenght()) {
      if (this.coincidenClaves()) {
        if (this.form.valid) {
          try {
            await this.firebaseService.signup(this.form.value as User);
            console.log("Éxito");
          } catch (error) {
            const x = error.code
            if(x  == 'auth/invalid-email'){
              console.error("Error al registrarse:", x + "ayudameeeee");
              this.emailBadly();
            }else if(x == 'auth/email-already-in-use'){
              console.error("Error al registrarse:", x + "ayudameeeee");
              this.emailUsed();
            }


            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario
          }
        }
      }
    }

  }

}


