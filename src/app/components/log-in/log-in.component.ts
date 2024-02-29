import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  constructor(private router: Router) {}

  onLogin() {
    this.isLoading = true;
    console.log('clicked login');
    console.log(this.username);
    console.log(this.password);
    setTimeout(() => this.onLoginHelper(this.username, this.password), 3000);
  }

  onLoginHelper(username: string, password: string) {
    console.log('onLoginHelper');
    console.log(this.username);
    console.log(this.password);

    this.isLoading = false;
    if (username === 'admin' && password === 'admin') {
      console.log('here');
      this.router.navigateByUrl('/admin');
    } else {
      console.log('here2');
      alert('invalid credentials');
    }
  }
}
