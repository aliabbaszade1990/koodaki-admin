import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Login, Logout } from './auth.actions';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.loginNgrx(action.payload).pipe(
      tap((result) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.username,
        });
      })
    );
  }

  // @Action(Logout)
  // logout(ctx: StateContext<AuthStateModel>) {
  //   const state = ctx.getState();
  //   return this.authService.logoutNgrx(state.token).pipe(
  //     tap(() => {
  //       ctx.setState({
  //         token: null,
  //         username: null
  //       });
  //     })
  //   );
  // }
}
