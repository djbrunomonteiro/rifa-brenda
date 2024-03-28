import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  googleAuthProvider = new GoogleAuthProvider();

  collectionRef: CollectionReference | undefined;

  userData$ = new BehaviorSubject<any>(undefined);

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore,
  ) { }

  loginAdmin() {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then(async res => {
        const email = res.user.email
        if (email === 'kelvinbruno15@gmail.com' || 'brunomonteiroestudio@gmail.com' || 'telmamatos2005@gmail.com') {
          const item = { nome: res?.user.displayName, email: res.user.email, id: res.user.uid, foto: res.user.photoURL };
        this.userData$.next(item);

        } else {
          const current = await this.auth.currentUser;
          current?.delete()
        }

      }).catch(err => {
        console.log('houve error', err);

      });



  }

  isAuth() {
    this.auth.onAuthStateChanged((user) => {
      if (!user) { return }
      const item = { nome: user.displayName, email: user.email, id: user.uid, foto: user.photoURL };
      this.userData$.next(item);
    });

  }
}
