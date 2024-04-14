import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Product, Traveler } from 'src/app/services/service-models';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent {
  id: string | null = '';
  product: Product | undefined = undefined;
  isLoading = false;
  productDisplayedColumns: string[] = [
    'asin',
    'title',
    '_id',
    'url',
    'price',
    'dimensions',
    'weight',
    'height',
    'width',
    'quantity_ordered',
  ];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id ' + this.id);
    if (this.id && this.id !== '') this.getProduct();
  }

  getProduct() {
    if (!this.id) return;
    this.isLoading = true;
    console.log('getProduct ');
    this.adminService.getProduct(this.id).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.product = data.prod;
        console.log(data);
        console.log(this.product.asin);
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
}
