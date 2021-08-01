import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/user/';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  deleteContact(id: string, token: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token })
    }

    return this.http.post(API_URL + id, {}, httpOptions)
  }

  updateContact(id: string, name: string, phone: string, token: any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token })
    }

    return this.http.put(API_URL, { id, name, phone }, httpOptions);
  }

  createContact(name: string, phone: string, token: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token })
    }

    return this.http.post(API_URL, {
      name, phone
    }, httpOptions);
  }

}
