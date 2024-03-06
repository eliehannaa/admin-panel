import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Product, Traveler } from 'src/app/services/service-models';

@Component({
  selector: 'app-accept-product',
  templateUrl: './accept-product.component.html',
  styleUrls: ['./accept-product.component.css'],
})
export class AcceptProductComponent {
  orderId: string | null = '';
  id: string | null = '';
  travelers: Traveler[] = [];
  product: Product | undefined = undefined;
  isLoading = false;
  traveler = '';
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
    this.orderId = this.route.snapshot.paramMap.get('orderId');
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
        this.getActiveTravelers();
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

  getActiveTravelers() {
    this.isLoading = true;
    this.adminService.getActiveTravelers().subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log(data);
        this.travelers = data.travelers;
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }

  onSelectChange(event: string) {
    console.log('onSelectChange ' + event);
  }

  assignOrder(travelerId: string) {
    if (travelerId === '') return;
    console.log('assignOrder ');
    this.isLoading = true;
    if (this.orderId) {
      this.adminService.assignOrder(this.orderId, travelerId).subscribe({
        next: (data) => {
          this.isLoading = false;
          console.log(data);
          this.router.navigateByUrl('/admin');
        },
        error: (err) => {
          console.log('ERROR ' + err);
          this.isLoading = false;
        },
      });
    }
  }
}
