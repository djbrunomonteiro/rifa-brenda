import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"rifa-brenda","appId":"1:249198544691:web:280944029e34281d366046","storageBucket":"rifa-brenda.appspot.com","apiKey":"AIzaSyD9vftHNix5Ice0XNFKDgF2DTKk8t5NwkE","authDomain":"rifa-brenda.firebaseapp.com","messagingSenderId":"249198544691"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync()]
};
