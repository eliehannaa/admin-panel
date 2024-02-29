import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest, AuthResponse } from './service-models';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private url = 'http://localhost:5000';
  constructor(private http: HttpClient) {}

  login(body: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/login', body).pipe();
  }
}
