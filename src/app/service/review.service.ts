import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private databaseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  
  getNotReview(): Observable<any> {
    const url = `${this.databaseUrl}/not-review`;
    return this.http.get<any[]>(url);
  }

  getReviewed(): Observable<any[]> {
    const url = `${this.databaseUrl}/reviewed`;
    return this.http.get<any[]>(url);
  }

 
}
