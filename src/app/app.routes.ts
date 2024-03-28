import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent() {
            return import('./components/pages/home/home.component').then(m => m.HomeComponent);
        },
    }
];
