import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService : AuthService,
    private router: Router) {

  }

  userData: any;

  loginForm = this.formBuilder.group({
    email:this.formBuilder.control('', Validators.required),
    password:this.formBuilder.control('', Validators.required)
  });

  proceedLogin()
  {
    if(this.loginForm.valid) { //Si les données renseignées sont valides
      /*this.authService.registerUser(this.registerForm.value).subscribe(
        result => {
          this.toastr.success('Veuillez confirmer votre email en cliquant sur le lien reçu.','Inscription réussie !');
          this.router.navigate(['connexion']);
        }
      );*/
      this.authService.getUserByEmail(this.loginForm.value.email).subscribe(
        result => {
          this.userData = result;
          console.log(this.userData);
          console.log(result.valueOf().toString());
          console.log(this.userData.password);
          console.log(this.loginForm.value.password);
          if(this.userData.password === this.loginForm.value.password) {
            //Check si compte actif ou pas
            if(this.userData.isActive) {

            } else {
              this.toastr.error("Compte inactif. Veuillez activer votre compte.");
              /*TODO : Cette partie est à étudier dans une prochaine itération pour traiter
                 le cas où l'utilisateur a perdu le mail d'activation....*/
            }
          } else {
            this.toastr.error("Email et/ou mot de passe incorrects.");
          }
        }
      );

    } else { //Sinon
      this.toastr.warning('Certaines informations sont incorrectes.');
    }
  }
}
