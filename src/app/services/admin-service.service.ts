import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActiveOrdersResponse,
  Client,
  Order,
  PendingOrdersResponse,
  Product,
  getClientsResponse,
  getTravelersResponse,
} from './service-models';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  // private url = 'http://192.168.1.18:5000';
  private url = 'http://172.20.64.1:5000';

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

  getAllClients(): Observable<getClientsResponse> {
    return this.http.get<getClientsResponse>(this.url + '/admin/home/clients');
  }

  getAllTravelers(): Observable<getTravelersResponse> {
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

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + '/admin/products/:id');
  }
}
