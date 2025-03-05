import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule, FormsModule, NavbarComponent, HomepageComponent ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}

