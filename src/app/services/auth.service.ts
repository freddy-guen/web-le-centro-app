import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000/';
  usersApiUrl = 'http://localhost:3000/utilisateurs';


  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.usersApiUrl);
  }

  getUserByEmail(email : string) {
    return this.http.get(this.usersApiUrl + '/' + email);
  }

  registerUser(inputData: any) {
    return this.http.post(this.usersApiUrl, inputData)
  }

  updateUser(email: string, inputData: any) {
    return this.http.put(this.usersApiUrl + '/' + email, inputData);
  }
}
