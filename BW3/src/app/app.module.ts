import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllpostComponent } from './components/allpost/allpost.component';
import { SinglepostComponent } from './components/singlepost/singlepost.component';
import { ProfileComponent } from './components/profile/profile.component';
const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'posts',
    component: AllpostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post',
    component: SinglepostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profilo',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    AllpostComponent,
    SinglepostComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
