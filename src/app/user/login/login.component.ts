import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {FormBuilder} from '@angular/forms';
import {UserSignupService} from '../user-signup.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm;
  signinStatus = true;
  signInErrorMessage = '';

  constructor(private formBuilder: FormBuilder, private userService: UserSignupService, private router: Router) {
    this.signinForm = this.formBuilder.group({emailId: '', password: ''});
  }

  ngOnInit(): void {
  }

  onsumbitLoginForm(signinForm: User): void {
    console.log(signinForm);
    const user = signinForm.emailId;
    this.userService.login(signinForm).subscribe({
      next: data => this.navigateToHome(data, user),
      error: error => console.error('There was an error!', error)
    });
  }

  private navigateToHome(status: any, user: string): void {
    if (status.signInSuccess) {
      sessionStorage.setItem('user', user);
      this.router.navigate(['home']);
    } else {
      this.signinStatus = false;
      this.signInErrorMessage = 'Unable to Sign In!!';
      this.router.getCurrentNavigation();
    }
  }
}
