import { Injectable, Inject, afterNextRender } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authToken?: string;

  private tokenKey: string = 'authToken'

  private API_URL = environment.api_url + '/api/v1/auth/'; //declaring which router midpoint to

  currentUser?: any;

  loginState?: boolean;

  private _saveToStorage(key: string, value: any){ //function to set a key and a value to the local storage
    localStorage.setItem(key, value);
  }


  saveAuthToken(): void{ //function calling previous function and storing the token 
    this._saveToStorage(this.tokenKey, this.authToken);
  }


  isLoggedIn(): boolean{
    let token = localStorage.getItem(this.tokenKey); //retrieving the token from local storage
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) :  null;
  }

  getCurrentUser(cb?: () => void){
    this.getProfile().subscribe((res) => {
      if(res['status'] == 'success'){
        this.currentUser = res.data!['user'];
        if (cb) cb();
      }
    })
  }

  login(data: any): Observable<any>{
    return  this._http.post<any>(this.API_URL + 'login', data)
                                .pipe(
                                  map((res) => {
                                    return res;
                                  })
                                )
  }

    //function using api getprofile endpoint to execute login on the front end
  getProfile(): Observable<any>{
    return this._http.get<any>(this.API_URL + '/my-profile')
                              .pipe(
                                map((res) => {
                                  return res;
                                })
                              )
  }

  constructor(private _http: HttpClient) { }

  registerUser(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + 'register', data)
                                .pipe(
                                  map((res) =>{
                                    return res;
                                  })
                                )
  }

  logout(){
    this.authToken = '';
    this._saveToStorage(this.tokenKey, this.authToken);
  }
}
