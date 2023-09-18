import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';
import { LoginComponent } from './pages/login/login.component';
import { PromptComponent } from './pages/prompt/prompt.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginGuard } from './guards/login.guard';
import { OnePhotoComponent } from './pages/one-photo/one-photo.component';

const routes: Routes = [
  { path: '', redirectTo: 'prompt', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'prompt', component: PromptComponent},
  { path: 'newsletter', component: NewsletterComponent, canActivate: [LoginGuard]},
  { path: 'about', component: AboutComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  { path: 'users', component: UsersComponent, canActivate: [LoginGuard]},
  { path: 'organization', component: OnePhotoComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
