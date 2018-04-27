import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListItemComponent } from './shopping-list/shopping-list-item/shopping-list-item.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AboutComponent } from './about/about.component';
import { APP_ROUTES } from './app-routing.module'; 
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListItemComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    //forRoot define as rotas com o APP_ROUTES
    RouterModule.forRoot(APP_ROUTES),

    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    ShoppingListService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
