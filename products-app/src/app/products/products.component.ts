import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  data: any;
  deleteProductResponse: any;
  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.apiService.getProductData().subscribe(
      (response) => {
        this.data = response?.products;
        console.log('Data from API:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  updateProduct(productData: any): void {
   const navigationExtras: Object = {
     queryParams: {
       productData: JSON.stringify(productData),
     },
   };
   this.router.navigate(['/update-product'], navigationExtras);
  }
  deleteProduct(id: number): void {
    this.apiService.deleteProductData(id).subscribe(
      (response) => {
        this.deleteProduct = response;
        console.log('Deleted data:', this.deleteProduct);

        this.showAlert('Product deleted successfully');
      },
      (error) => {
        console.error('Error deleting data:', error);

        this.showAlert('Product deleted successfully');
      }
    );
  }
  addProduct(): void {
    this.router.navigate(['/add-product']);
  }
  onCardClick(productData: any): void {
    const navigationExtras: Object = {
      queryParams: {
        productData: JSON.stringify(productData),
      },
    };
    this.router.navigate(['/product-details'], navigationExtras);
    // this.router.events.subscribe((event) => {
    //   console.log('event', event);
    // });
  }

  showAlert(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
