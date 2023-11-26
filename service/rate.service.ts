import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class RateService {

  
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${id}`);
  }
  submitReview(productID: number, rating: number, comment: string) {
    const body = { ProductID: productID, Rating: rating, Comment: comment };
    return this.http.post(`${this.baseUrl}/submit-review`, body);
  }

  updateReviewStatus(productId: number): Observable<any> {
    const url = `${this.baseUrl}/submit-review${productId}`;
    return this.http.put(url, {});
  }
  
}
