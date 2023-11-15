import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService : AuthService,
    private router: Router) {

  }

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  registerForm = this.formBuilder.group({
    id : this.formBuilder.control(
      '',
      Validators.compose(
        [Validators.required, Validators.minLength(5)]
      )
    ),
    nom : this.formBuilder.control('', Validators.required),
    prenom : this.formBuilder.control('', Validators.required),
    email : this.formBuilder.control(
      '',
      Validators.compose(
        [Validators.required, Validators.email]
      )
    ),
    password : this.formBuilder.control(
      '',
      Validators.compose(
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
      )
    ),
    isActive : this.formBuilder.control(false),
    role : this.formBuilder.control('')
  });

  proceedRegistration() {
    if(this.registerForm.valid) { //Si les données renseignées sont valides
      this.authService.registerUser(this.registerForm.value).subscribe(
        result => {
          this.toastr.success('Veuillez confirmer votre email en cliquant sur le lien reçu.','Inscription réussie !');
          this.router.navigate(['connexion']);
        }
      );
    } else { //Sinon
      this.toastr.warning('Certaines informations sont incorrectes.')
    }
  }

}
