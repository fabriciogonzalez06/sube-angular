import { NgModule } from "@angular/core";

import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {SharedModule} from 'primeng/api';
import {DividerModule} from 'primeng/divider';
import {AvatarModule} from 'primeng/avatar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SkeletonModule} from 'primeng/skeleton';




@NgModule({
  imports:[
    MenubarModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    DividerModule,
    AvatarModule,
    OverlayPanelModule,
    ScrollTopModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    SkeletonModule

  ],
  exports:[
    MenubarModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    DividerModule,
    AvatarModule,
    OverlayPanelModule,
    ScrollTopModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    SkeletonModule
  ]
})
export class CompartidoNgPrimeModule{}
