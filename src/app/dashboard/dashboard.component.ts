import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  poolData: ICognitoUserPoolData;
  userPool: CognitoUserPool;
  cognitoUser: CognitoUser | null;
  info: CognitoUserSession;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId,
    };
    this.userPool = new CognitoUserPool(this.poolData);
    this.cognitoUser = this.userPool.getCurrentUser();
    this.getInfo();
  }
  getInfo() {
    this.cognitoUser?.getSession(
      (error: Error | null, session: null | CognitoUserSession) => {
        if (session) this.info = session;
      }
    );
  }
  onLogout(): void {
    this.cognitoUser?.signOut();
    this.router.navigate(['signin']);
  }
}
