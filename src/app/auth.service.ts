import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  rederictUrl: string;

  login(name: string, password: string): Observable<boolean>{
    const isLoggedIn = (name == 'maher' && password == 'maher');
    return of(isLoggedIn).pipe(
      delay(1000),
      tap((isLoggedIn) => this.isLoggedIn = isLoggedIn)
    );
  }

  logout(){
    this.isLoggedIn = false;
  }
}
