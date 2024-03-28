import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent() {
            return import('./components/pages/home/home.component').then(m => m.HomeComponent);
        },
    },
    {
        path: 'vendedor/:email',
        loadComponent() {
            return import('./components/pages/home/home.component').then(m => m.HomeComponent);
        },
    },
    {
        path: 'admin',
        loadComponent() {
            return import('./components/pages/admin/admin.component').then(m => m.AdminComponent);
        },
    }
];
