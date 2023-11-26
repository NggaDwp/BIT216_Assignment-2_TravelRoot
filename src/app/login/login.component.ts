import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    if (!this.email || !this.password) {
      // alert('Please enter your email and password.');
      return;
    }
  
    const loginData = { email: this.email,password: this.password};
  
    this.http.post('http://localhost:3000/login', loginData)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          // alert('Login successful!'); // Notify user
          // Perform actions after successful login, such as storing tokens, redirecting, etc.
          // For example, you might handle token storage and redirection here.
          // this.authService.storeToken(response.token); // Store token in local storage
          this.router.navigate(['/dashboard']); // Redirect to the dashboard
        },
        (error) => {
          console.error('Login failed:', error);
          // Handle error, show appropriate message to the user
          // alert('Login failed. Please check your credentials.');
        }
      );
  }
  
}
