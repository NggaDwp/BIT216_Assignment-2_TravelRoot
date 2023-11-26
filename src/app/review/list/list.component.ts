import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dropdownChoice: string = '';
  reviewData: any[] = [];

  constructor(private reviewService: ReviewService, private router: Router) {}

  changeName(): void {
    const dropdown = document.getElementById(
      'nameDropdown'
    ) as HTMLSelectElement;
    this.dropdownChoice = dropdown.value;
    this.getProducts();
  }

  goToRatePage(productId: number): void {
    this.router.navigate(['/rate', productId]);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    if (this.dropdownChoice === 'Not') {
      this.reviewService.getNotReview().subscribe((data) => {
        this.reviewData = data;
      });
    } else if (this.dropdownChoice === 'Reviewed') {
      this.reviewService.getReviewed().subscribe((data) => {
        this.reviewData = data;
      });
    } else {
      this.reviewService.getNotReview().subscribe((data) => {
        this.reviewData = data;
      });
    }
  }
}
