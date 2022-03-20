import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/auth.service';
import 'rxjs/add/operator/map';
import { state } from '@angular/animations';
import { LoginService } from '../services/login/login.service';
@Injectable()
export class GuardsGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return this.authService.User$.map(user => {
      if (user) return true;
      this.loginService.pushOpenLoginModal(true);
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } })
      return false;
    });
  }
}
