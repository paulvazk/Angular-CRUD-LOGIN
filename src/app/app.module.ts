import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
//Enrutamineto
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//login
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
//Componentes
import { ItemListComponent } from './pages/home/item-list/item-list.component';
import { ItemComponent } from './pages/home/item/item.component';
//servicio para la realdata base
import { ItemService } from './services/item.service';
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    ItemListComponent,
    ItemComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
