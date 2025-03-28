import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
  imports:[CommonModule, NavbarComponent, FooterComponent],
  standalone: true,

})
export class SuccessComponent {
  paymentSuccess: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['paymentSuccess']) {
      this.paymentSuccess = true;
    } else {
      this.router.navigate(['/products']);
    }
  }

  goShopping() {
    this.router.navigate(['/products']); 
  }
}
