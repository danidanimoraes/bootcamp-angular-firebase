import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthService } from './auth.service';

export const APP_ROUTES: Routes = [
    {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthService]
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent,
        canActivate: [AuthService]
    },
    {
        path: '',
        // Não muda a rota com o redirectTo
        redirectTo: '/shopping-list',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: ShoppingListComponent
    }
];