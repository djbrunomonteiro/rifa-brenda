import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IResponse } from '../models/response';
import { INums } from '../models/nums';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  apiUrl = environment.apiUrl;


  constructor(
    private http: HttpClient
  ) {

  }

  getAll() {
    return this.http.get(`${this.apiUrl}/rifa`).pipe(map((res: any) => {
      console.log(res);
      const {status, results, message} = res; 
      const response: IResponse = {status, results, message};
      return response;
    }));
  }

  addOne(item: INums) {
    delete item.id
    return this.http.post(`${this.apiUrl}/rifa`, item);

  }

  updateOne(item: INums) {
    return this.http.post(`${this.apiUrl}/rifa/${item.id}`, item);
  }

}
