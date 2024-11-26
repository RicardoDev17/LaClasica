import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    IonicStorageModule.forRoot()  // Asegúrate de importar IonicStorageModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
