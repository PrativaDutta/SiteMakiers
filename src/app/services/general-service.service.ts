import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  apiUrl: string;
  token: any;
  header: any;
  private idSource = new BehaviorSubject<string>('');
  currentId = this.idSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
    this.token = localStorage.getItem('token');

  }
  get(url: any, header: any) {
    return this.http.get(this.apiUrl + url, header);
  }
  post(url: any, body: any, header: any) {
    return this.http.post(this.apiUrl + url, body, header);
  }
  changeId(id: string) {
    this.idSource.next(id);
  }
}

