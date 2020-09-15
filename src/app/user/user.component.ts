import {Component, OnInit} from '@angular/core';
import {User} from './model/user';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserSignupService} from './user-signup.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  signupForm;
  signUpStatus = true;
  signUpStatusMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserSignupService) {
    this.signupForm = this.formBuilder.group({name: '', emailId: '', password: ''});
  }

  ngOnInit(): void {
  }

  onsumbitForm(signupForm: User): void {
    console.log(signupForm);
    const user = signupForm.emailId;
    this.userService.register(signupForm).subscribe({
      next: data => this.navigateToHome(data, user),
      error: error => console.error('There was an error!', error)
    });
  }

  private navigateToHome(status: any, user: string): void {
    if (status.signInSuccess) {
      sessionStorage.setItem('user', user);
      this.router.navigate(['home']);
    } else {
      this.signUpStatus = false;
      this.signUpStatusMessage = 'Unable to Sign Up!!';
      this.router.getCurrentNavigation();
    }
  }
}
