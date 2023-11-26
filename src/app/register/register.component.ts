// KEDUA Running
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Add this import

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  businessName: string = '';
  businessDescription: string = '';

  constructor(private http: HttpClient, private router: Router) {} // Inject Router here

  
    onRegister() {
      if (!this.fullName || !this.email || !this.password || !this.businessName || !this.businessDescription) {
        alert('Please fill all the column');
        return;
      }
  
    const registrationData = { fullName: this.fullName, email: this.email, password: this.password };
    // add other fields to registrationData if required
  
    this.http.post('http://localhost:3000/register', registrationData)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // alert('Verification have been send to email');
          this.router.navigate(['/login']);
          
          return;
          // handle success
        },
        (error) => {
          console.error('Registration failed:', error);
          // handle error
        }
      );
  }
  
}

// //AWAL
//   onRegister() {
//     const registrationData = { fullName: this.fullName, email: this.email, password: this.password, businessName: this.businessName, businessDescription: this.businessDescription };
    
//   onRegister() {
//       if (!this.fullName || !this.email || !this.password ||this.businessName || this.businessDescription) {
//         // console.error('Please fill in all required fields.');
//         alert('Please fill in all required fields.');
//         return;
//       }

//       const registrationData = { fullName: this.fullName, email: this.email, password: this.password };

//     // Send registration data to the backend
//     this.http.post('http://localhost:3000/register', registrationData)
//       .subscribe(
//         (response) => {
//           // Registration successful, navigate to login page or handle the response
//           console.log('Registration successful:', response);
//           // NAMBAHIN INI AJA SAMPE JAM 1
//           this.router.navigate(['/login']); // Navigate to login page
//         },
//         (error) => {
//           // Handle registration error
//           console.error('Registration failed:', error);
//           // Show an error message to the user or handle the error accordingly
//         }
//       );
//   }
