import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';

import { AuthenticationComponent } from './authentication/authentication.component';
import { MatchesComponent } from './matches/matches.component';
import { AuthGuardService } from './auth-gaurd.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { ApiService } from './api.service';
import { CompletedComponent } from './completed/completed.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PointsComponent } from './points/points.component';
import { OrderByPipe } from './order-by.pipe';

const routes: Routes = [
  { path: 'matches', canActivate: [ AuthGuardService ], component: MatchesComponent },
  { path: 'authenticate', component: AuthenticationComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MatchesComponent,
    CompletedComponent,
    UpcomingComponent,
    PointsComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatBadgeModule,
    MatExpansionModule
  ],
  exports: [RouterModule],
  providers: [ApiService, AuthGuardService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
