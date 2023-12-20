import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  screenData: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe;
    this.route.queryParams.subscribe((params: any) => {
      const productData = JSON.parse(params['productData']);

      if (productData) {
        this.screenData = productData;
      }
    });
  }
}
