import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Boolean flag to track if the navbar is toggled
  isNavbarToggled: boolean = false;

  // Toggle the background color when the navbar toggler button is clicked
  toggleNavbar(): void {
    this.isNavbarToggled = !this.isNavbarToggled;
  }
}
