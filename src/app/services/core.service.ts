import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { IResponse } from '../models/response';
import { INums } from '../models/nums';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  apiUrl = environment.apiUrl;


  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) {

  }

  getAll() {
    return this.http.get(`${this.apiUrl}/rifa`)
      .pipe(
        map((res: any) => {
          const { status, results, message } = res;
          const response: IResponse = { status, results, message };
          return response;
        }),
        catchError(err => of(err))
      );
  }

  addOne(item: INums) {
    delete item.id
    return this.http.post(`${this.apiUrl}/rifa`, item);

  }

  updateOne(item: INums) {
    return this.http.patch(`${this.apiUrl}/rifa/${item.id}`, item);
  }

  showMessage(message: string, duration = 3000) {
    this.snackBar.open(message, 'Fechar', {
      duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    })
  }

}
