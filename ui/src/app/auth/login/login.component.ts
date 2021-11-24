import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  blnSubmitted: boolean = false;
  blnLoginFailed: boolean = false;

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  //login function
  login(form: any): void {
    this.blnLoginFailed = false;
    this.blnSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.login(form.value).subscribe((Response) => {
        console.log("Login success")
      },
        (error) => {
          this.blnLoginFailed = true;
        }
      );
    }
  }

}
