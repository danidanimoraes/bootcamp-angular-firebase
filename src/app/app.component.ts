import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dani\'s Shopping Cart';

  constructor(
    private authService: AuthService
  ){}

  login(): void
  {
    this.authService.login()
  }

  logout(): void
  {
    this.authService.logout()
  }
}
