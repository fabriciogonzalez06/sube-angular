import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComercioModule } from './comercio/comercio.module';
import { CompartidoModule } from './compartido/compartido.module';

import { ToastrModule } from 'ngx-toastr';

import {BlockUIModule} from 'primeng/blockui';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { AuthTokenService } from './interceptors/auth-token.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    BlockUIModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right',timeOut: 5000,}),
    AppRoutingModule,
    CompartidoModule,
    ComercioModule,

  ],
  bootstrap: [AppComponent],
  providers: [
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useValue:AuthTokenService,
    //   multi:true
    // }
  ],
})
export class AppModule { }
