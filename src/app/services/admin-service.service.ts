import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActiveOrdersResponse,
  Client,
  Order,
  PendingOrdersResponse,
  Product,
  ProductResponse,
  Review,
  WaitingOrdersResponse,
  getClientsResponse,
  getTravelersResponse,
  testimonials,
} from './service-models';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  private url = 'http://localhost:5000';
  // private url = 'http://172.20.64.1:5000';

  constructor(private http: HttpClient) {}

  getPendingOrders(): Observable<PendingOrdersResponse> {
    return this.http.get<PendingOrdersResponse>(
      this.url + '/admin/pendingorders'
    );
  }

  getActiveOrders(): Observable<ActiveOrdersResponse> {
    return this.http.get<ActiveOrdersResponse>(
      this.url + '/admin/activeorders'
    );
  }

  getWaitingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/admin/waitingorders');
  }

  getAllClients(): Observable<getClientsResponse> {
    return this.http.get<getClientsResponse>(this.url + '/admin/home/clients');
  }

  getAllTravelers(): Observable<getTravelersResponse> {
    return this.http.get<getTravelersResponse>(
      this.url + '/admin/home/travelers'
    );
  }

  getActiveTravelers(): Observable<getTravelersResponse> {
    return this.http.get<getTravelersResponse>(
      this.url + '/admin/home/travelers'
    );
  }

  getNewTravelers(): Observable<getTravelersResponse> {
    return this.http.get<getTravelersResponse>(
      this.url + '/admin/home/newtravelers'
    );
  }

  acceptNewTraveler(id: string): Observable<any> {
    return this.http.post(
      this.url + '/admin/home/newtravelers/' + id + '/accept',
      {}
    );
  }

  rejectOrder(id: string): Observable<any> {
    return this.http.post(
      this.url + '/admin/pendingorders/' + id + '/reject',
      {}
    );
  }

  getProduct(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.url + '/admin/products/' + id);
  }

  assignOrder(orderId: string, travelerId: string) {
    return this.http.post(
      this.url +
        '/admin/pendingorders/' +
        orderId +
        '/activetravelers/' +
        travelerId +
        '/assign',
      {}
    );
  }

  updateStatus(orderId: string) {
    return this.http.post(
      this.url + '/admin/activeorders/' + orderId + '/updatestatus',
      {}
    );
  }

  markassentout(orderId: string) {
    return this.http.post(
      this.url + '/admin/home/activeorders/' + orderId + '/markassentout',
      {}
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + '/admin/products/' + id);
  }

  getFeedbacks(): Observable<testimonials> {
    return this.http.get<testimonials>(this.url + '/testimonials');
  }
}
