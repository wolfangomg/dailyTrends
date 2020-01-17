import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feed } from '../model/feed';

@Injectable()
export class ApiService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = '/api';
  }

  public getFeedList(): Observable<any> {
    const url = this.url + '/daily/list';
    return this.http.get<Feed[]>(url);
  }
}
