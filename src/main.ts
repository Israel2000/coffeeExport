import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes)],
  });