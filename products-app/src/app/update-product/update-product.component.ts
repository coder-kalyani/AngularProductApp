import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  data: any;
  updateProductResponse: any;
  myForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe;
    this.route.queryParams.subscribe((params: any) => {
      const productData = JSON.parse(params['productData']);
      if (productData) {
        this.data = productData;
        this.myForm.patchValue({
          title: this.data.title,
          description: this.data.description,
          price: this.data.price,
          stock: this.data.stock,
          brand: this.data.brand,
          category: this.data.category,
        });
      }
    });
  }
  updateProductDetails(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.log('updated form data is >>', this.data.id);
      this.apiService.updateProductData(this.data.id, formData).subscribe(
        (response) => {
          this.updateProductResponse = response;
          console.log('updated data:', this.updateProductResponse);
          this.showAlert('Product updated successfully');
        },
        (error) => {
          console.error('Error while updating data:', error);
          this.showAlert('Error while updating data, Please try again');
        }
      );
    }
  }
  showAlert(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
