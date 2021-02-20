import { NgModule } from "@angular/core";


import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { ConfirmationService, MessageService } from "primeng/api";
import {ToastModule} from 'primeng/toast';


@NgModule({
  imports:[CardModule
  ,
  DividerModule,
  ButtonModule,
  InputTextModule,
  ToastModule
],
  exports:[CardModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ]
})
export class AuthNgPrimeModule{}
