import { AnnonceService } from './annonce.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnnonceComponent } from './annonce/annonce.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
    ListeAnnoncesComponent,
    AnnonceComponent,
    DropzoneComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    NgxDropzoneModule
  ],
  providers: [AnnonceService],
  bootstrap: [AppComponent,]
})
export class AppModule { }
