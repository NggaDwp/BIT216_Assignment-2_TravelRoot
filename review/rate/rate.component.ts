import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RateService } from 'src/app/service/rate.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent {
  @Input() starRate: number = 0;
  @Output() rateClick: EventEmitter<number> = new EventEmitter<number>();

  star: number[] = Array(5).fill(0);
  productID: number = 0;
  product: any = {};
  userRating: number = 0;
  userReview: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: RateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId !== null) {
      this.service.getProductById(+productId).subscribe((data) => {
        this.product = data;
      });
    } else {
      console.error('Product ID is null');
    }
  }

  color(index: number): string {
    return index < this.starRate ? 'gold' : 'currentColor';
  }

  submitReview(productId: number): void {
    if (this.userRating > 0) {
      this.service
        .submitReview(productId, this.userRating, this.userReview)
        .subscribe(
          (response) => {
            console.log('Review submitted successfully:', response);
            this.service.updateReviewStatus(productId).subscribe(
              () => {
                console.log('Product review status updated successfully.');

                this.rateClick.emit(this.userRating);
              },
              (error) => {
                console.error('Error updating product review status:', error);
              }
            );
          },
          (error) => {
            console.error('Error submitting review:', error);
          }
        );
    } else {
      console.warn('Please rate the product before submitting the review.');
      alert('Please rate the product before submitting');
    }
    this.router.navigate(['/review']);

  }
  ratesProduct(rating: number): void {
    this.userRating = rating;
  }
}
