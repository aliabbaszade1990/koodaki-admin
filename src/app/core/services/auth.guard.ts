import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const productId = route.params['id'];
    // return this.authService.currentUser.map(authState => !!authState).do (auth => {if(!auth) this.router.navigate(['login'])}).taken(1);
    // const currentUser = this.authService.currentUserValue;
    const currentUser = this.authService.getAuthToken();
    if (currentUser) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/log-in'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}