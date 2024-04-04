import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  googleAuthProvider = new GoogleAuthProvider();

  collectionRef: CollectionReference | undefined;

  userData$ = new BehaviorSubject<any>(undefined);

  emails = environment.emails;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore,
    private core: CoreService
  ) { }

  loginAdmin() {

    signInWithPopup(this.auth, this.googleAuthProvider)
      .then(async res => {
        const email = res.user.email;
        if(!email){return}
        if(!this.emails.includes(email)){
          const current = await this.auth.currentUser;
          current?.delete();
          this.core.showMessage('Email NÃO Cadastrado. Tente Novamente com outro email');
          this.userData$.next(undefined);

          return;
        }
        const item = { nome: res?.user.displayName, email: res.user.email, id: res.user.uid, foto: res.user.photoURL };
        this.userData$.next(item);

      }).catch(err => {
        console.log('houve error', err);

      });



  }

  isAuth() {
    console.log('chamouu is auth');
    
    this.auth.onAuthStateChanged((user) => {
      console.log(user);
      
      if (!user) { return }
      const item = { nome: user.displayName, email: user.email, id: user.uid, foto: user.photoURL };
      this.userData$.next(item);
    });


  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
    this.userData$.next(undefined);

  }
}
