import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import { map } from 'rxjs';

import { provideHttpClient, withFetch } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL = environment.api_url + '/api/v1/todo/';

  constructor(private _http: HttpClient) { }

  allTasks(): Observable<any>{
    return this._http.get<any>(this.API_URL + 'alltasks')
                              .pipe(
                                map((res) => {
                                  return res;
                                })
                              )
  }

  oneTask(id: number): Observable<any>{
    return this._http.get<any>(this.API_URL + `onetask/${id}`)
                              .pipe(
                                map((res) => {
                                  return res;
                                })
                              )
  }

  editTask(id:number, data: any): Observable<any>{
    return this._http.patch<any>(this.API_URL + `edittask/${id}`, data)
                                .pipe(
                                  map((res) => {
                                    return res;
                                  })
                                )
  }


  createTask(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + 'createtask', data )
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }

  deleteTask(id:number): Observable<any>{
    return this._http.delete<any>(this.API_URL + `/deletetask/${id}` )
                              .pipe(
                                map((res) =>{
                                  return res;
                                })
                              )
  }
}
