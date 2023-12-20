import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  myForm: FormGroup;
  addProductResponse: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar
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

  addProductDetails() {
    if (this.myForm.valid) {
      // Process the form data
      const formData = this.myForm.value;
      console.log('formData is >>', formData);
      this.apiService.addProductData(formData).subscribe(
        (response) => {
          this.addProductResponse = response;
          console.log('add product response:', this.addProductResponse);
          this.showAlert('Product added successfully');
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.showAlert('Error while adding product, please try again');
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
