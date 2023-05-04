import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  profile?: KeycloakProfile;

  public constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.keycloakService.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnAuthSuccess) {
          this.keycloakService.loadUserProfile().then(profile => {
            this.profile = profile;
          });
        }
      }
    });
  }

  logout(): void {
    this.keycloakService.logout(window.location.origin+"/")
  }

}
