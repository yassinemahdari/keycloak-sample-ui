import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

export function kcFactory(keycloakService: KeycloakService) {
  return () => {
    keycloakService.init({
      config: {
        realm: "keycloak-demo-realm",
        clientId: "keycloak-demo",
        url: "http://localhost:8080"
      },
      initOptions: {
        onLoad: "login-required"
      }
    })
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    { provide: APP_INITIALIZER, deps: [KeycloakService], useFactory: kcFactory, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
