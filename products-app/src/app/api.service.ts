// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getProductData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }
  addProductData(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/add`, payload);
  }
  deleteProductData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
  updateProductData(id: number, payload: any): Observable<any> {
     return this.http.put(`${this.apiUrl}/products/${id}`, payload);
  }
}
