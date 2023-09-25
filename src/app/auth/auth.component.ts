import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLoading = false;
  error: string = '';
  isLoginMode = false;

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.error = "";
    if (!form.valid){
        this.isLoading = false;
        return;
    } 
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(
        (data) => {
          this.isLoading = false;
          console.log('success', data);
          this.router.navigate(["/recipes"])
        },
        (error) => {
          this.isLoading = false;
          this.error = error;
          console.log('error', error);
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe(
        (data) => {
          this.isLoading = false;
          console.log('success', data);
          this.router.navigate(["/recipes"])

        },
        (error) => {
          this.isLoading = false;
          this.error = error;
          console.log('error', error);
        }
      );
    }
    form.reset();

  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
