import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register(this.email, this.password).then(() => {
      alert('Verification email sent.');
    }).catch((error) => {
      console.error('Error registering: ', error);
    });
  }
}

