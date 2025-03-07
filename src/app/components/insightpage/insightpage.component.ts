import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-insightpage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './insightpage.component.html',
  styleUrl: './insightpage.component.css'
})
export class InsightpageComponent {
  productName: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productName = this.route.snapshot.paramMap.get('productName');
  }
}
