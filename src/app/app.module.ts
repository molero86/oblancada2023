import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';
import { NewsletterEventComponent } from './components/newsletter-event/newsletter-event.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { PromptComponent } from './pages/prompt/prompt.component';
import { PromptSlideComponent } from './components/prompt-slide/prompt-slide.component';
import { UsersComponent } from './pages/users/users.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { OnePhotoComponent } from './pages/one-photo/one-photo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalComponent,
    NewsletterComponent,
    NewsletterEventComponent,
    AboutComponent,
    HomeComponent,
    PromptComponent,
    PromptSlideComponent,
    UsersComponent,
    UserModalComponent,
    ImageModalComponent,
    OnePhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
