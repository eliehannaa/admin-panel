import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import {
  Client,
  Order,
  Product,
  Review,
  Traveler,
} from 'src/app/services/service-models';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css'],
})
export class AdminDataComponent implements OnInit {
  feedback: Review[] = [];
  pendingOrders: Order[] = [];
  activeOrders: Order[] = [];
  waitingOrders: Order[] = [];
  allClients: Client[] = [];
  allTravelers: Traveler[] = [];
  newTravelers: Traveler[] = [];
  isLoading = false;
  currentProduct: Product | undefined = undefined;
  statusMap = {
    '-1': 'Cancelled',
    '0': 'pending client',
    '1': 'assigned admin',
    '2': 'client confirmed',
    '3': 'acquired by traveler',
    '4': 'shipped by traveler',
    '5': 'arrived',
    '6': 'sent out',
    '7': 'completed',
  };
  getStatus(status: string | number) {
    if (status == '-1' || status == -1) return 'Cancelled';
    else if (status == '0' || status === 0) return 'pending client';
    else if (status == '1' || status === 1) return 'assigned admin';
    else if (status == '2' || status === 2) return 'client confirmed';
    else if (status == '3' || status === 3) return 'acquired by traveler';
    else if (status == '4' || status === 4) return 'shipped by traveler';
    else if (status == '5' || status === 5) return 'arrived';
    else if (status == '6' || status === 6) return 'sent out';
    else if (status == '7' || status === 7) return 'completed';
    else return status;
  }
  pendingOrdersDisplayedColumns: string[] = [
    'item',
    'client',
    'quantity',
    'status',
    'waiting_resp',
    'client_confirmed',
    'actions',
  ];
  activeOrdersDisplayedColumns: string[] = [
    'item',
    'client',
    'traveler',
    'quantity',
    'status',
    'waiting_resp',
    'client_confirmed',
    'update_status',
    'mark_sent_out',
  ];
  clientsDisplayedColumns: string[] = [
    'email',
    'name',
    'lastname',
    'nationality',
    'phone_number',
    'failed_login_attempts',
    'active_orders',
    'pending_orders',
    'completed_orders',
  ];
  travelersDisplayedColumns: string[] = [
    'email',
    'name',
    'lastname',
    'nationality',
    'phone_number',
    'failed_login_attempts',
    'new_orders',
    'assigned_orders',
    'completed_orders',
  ];
  newTravelersDisplayedColumns: string[] = [
    'email',
    'name',
    'lastname',
    'nationality',
    'phone_number',
    'failed_login_attempts',
    'accept traveler',
  ];
  feedbackDisplayedColumns: string[] = [
    'order',
    'arrived_on_time',
    'as_described',
    'good_service',
    'rating',
    'message',
  ];
  constructor(
    private adminService: AdminServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.getPendingOrders();
    this.getActiveOrders();
    this.getWaitingOrders();
    this.getAllClients();
    this.getAllTravelers();
    this.getNewTravelers();
    this.getFeedbacks();
  }

  getPendingOrders() {
    this.adminService.getPendingOrders().subscribe({
      next: (data) => {
        console.log(data);
        this.pendingOrders = data.pendingOrders;
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
  getActiveOrders() {
    this.adminService.getActiveOrders().subscribe({
      next: (data) => {
        console.log(data);
        this.activeOrders = data.activeOrders;
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
  getWaitingOrders() {
    this.adminService.getWaitingOrders().subscribe({
      next: (data) => {
        console.log(data);
        this.waitingOrders = data;
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
  getAllClients() {
    this.adminService.getAllClients().subscribe({
      next: (data) => {
        console.log(data);
        this.allClients = data.clients;
        this.activeOrders.forEach((order) => {
          this.allClients.forEach((client) => {
            if (order.client === client._id) {
              order.client = client.name;
            }
          });
        });
        this.pendingOrders.forEach((order) => {
          this.allClients.forEach((client) => {
            if (order.client === client._id) {
              order.client = client.name;
            }
          });
        });
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
  getAllTravelers() {
    this.adminService.getAllTravelers().subscribe({
      next: (data) => {
        console.log(data.travelers);
        this.allTravelers = data.travelers;
        this.activeOrders.forEach((order) => {
          this.allTravelers.forEach((traveler) => {
            if (order.traveler === traveler._id) {
              order.traveler = traveler.name;
            }
          });
        });
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
  getNewTravelers() {
    this.adminService.getNewTravelers().subscribe({
      next: (data) => {
        console.log(data);
        this.newTravelers = data.travelers;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
  acceptNewTraveler(id: string) {
    console.log('acceptNewTraveler ');
    this.isLoading = true;
    this.adminService.acceptNewTraveler(id).subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log(data);
        this.ngOnInit();
        alert('traveler accepted');
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
  rejectOrder(id: string) {
    console.log('rejectOrder ');
    this.isLoading = true;
    this.adminService.rejectOrder(id).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('data');
        this.ngOnInit();
        alert('order rejected');
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }

  getProduct(id: string, orderId: string) {
    console.log('id:  ' + id);
    this.router.navigateByUrl('/accept/' + id + '/' + orderId);
  }

  viewProduct(id: string) {
    console.log('id:  ' + id);
    this.router.navigateByUrl('/view/' + id);
  }

  updateStatus(orderId: string) {
    console.log('updateStatus ', orderId);
    this.isLoading = true;
    this.adminService.updateStatus(orderId).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('data');
        this.ngOnInit();
        alert('status updated');
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }

  markassentout(orderId: string) {
    console.log('markassentout ');
    this.isLoading = true;
    this.adminService.markassentout(orderId).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('data');
        this.ngOnInit();
        alert('order marked as sent out');
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }

  getProductDetails(id: string) {
    console.log('getProductDetails ');
    this.isLoading = true;
    this.adminService.getProduct(id).subscribe({
      next: (data) => {
        this.isLoading = false;
        // this.currentProduct = data.prod;
        console.log(data);
        // console.log(this.currentProduct);
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }

  getFeedbacks() {
    console.log('getFeedbacks ');
    this.adminService.getFeedbacks().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.feedback = data.testimonials;
        console.log(data);
        // console.log(this.currentProduct);
      },
      error: (err) => {
        console.log('ERROR ' + err);
        this.isLoading = false;
      },
    });
  }
}
