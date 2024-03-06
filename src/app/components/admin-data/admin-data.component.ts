import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import {
  Client,
  Order,
  Product,
  Traveler,
} from 'src/app/services/service-models';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css'],
})
export class AdminDataComponent implements OnInit {
  pendingOrders: Order[] = [];
  activeOrders: Order[] = [];
  waitingOrders: Order[] = [];
  allClients: Client[] = [];
  allTravelers: Traveler[] = [];
  newTravelers: Traveler[] = [];
  isLoading = false;
  currentProduct: Product | undefined = undefined;
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
  ];
  clientsDisplayedColumns: string[] = [
    'email',
    'name',
    'lastname',
    'nationality',
    'phone_number',
    'failed_login_attempts',
  ];
  travelersDisplayedColumns: string[] = [
    'email',
    'name',
    'lastname',
    'nationality',
    'phone_number',
    'failed_login_attempts',
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
        console.log(data);
        this.allTravelers = data.travelers;
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
}
