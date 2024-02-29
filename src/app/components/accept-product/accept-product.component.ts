import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Product } from 'src/app/services/service-models';

@Component({
  selector: 'app-accept-product',
  templateUrl: './accept-product.component.html',
  styleUrls: ['./accept-product.component.css'],
})
export class AcceptProductComponent {
  id: string | null = '';
  prod: Product | undefined = undefined;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminServiceService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id !== '') this.getProduct();
  }

  getProduct() {
    if (!this.id) return;
    this.isLoading = true;
    console.log('getProduct ');
    this.adminService.getProduct(this.id).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.prod = data;
        console.log(data);
      },
      error(err) {
        console.log('ERROR ' + err);
      },
    });
  }
}
