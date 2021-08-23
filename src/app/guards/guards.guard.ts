import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/auth.service';
import 'rxjs/add/operator/map';
import { state } from '@angular/animations';
@Injectable()
export class GuardsGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }
  canActivate(route, state: RouterStateSnapshot)
  // next: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot: Observable<boolean> | Promise<boolean> | boolean
  {
    return this.authService.User$.map(user => {
      if (user) return true;
      // console.log(user);
      this.router.navigate(['/contact'], { queryParams: { returnUrl: state.url } })
      return false;
    });
  }
}
