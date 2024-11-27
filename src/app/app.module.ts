import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para hacer llamadas HTTP
import { environment } from '../environments/environment';
import { RouteReuseStrategy } from '@angular/router';
// Importaciones de Firebase Authentication
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

import { LocalNotifications } from '@capacitor/local-notifications';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers:[
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp({"projectId":"laclasica-961f4","appId":"1:312964438916:web:589e638d589cc82e661bd1","storageBucket":"laclasica-961f4.firebasestorage.app","apiKey":"AIzaSyAx8EkWdm27FSeyqJNhN-jh52oTbQDsztM","authDomain":"laclasica-961f4.firebaseapp.com","messagingSenderId":"312964438916","measurementId":"G-MTXHQLWN8V"})),
    provideMessaging(() => getMessaging()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
