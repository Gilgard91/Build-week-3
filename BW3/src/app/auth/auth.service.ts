import { Injectable } from '@angular/core';
import { AuthData } from './auth-data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Password } from './password';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  apiURL = environment.apiURL;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  utente!: AuthData;
  constructor(private http: HttpClient, private router: Router) {}
  // Error handler usato per il login
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      errorMessage = error.error;
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again late.')
    );
  }
  getUser() {
    const user = localStorage.getItem('user');
    if (!user) {
      console.log('user non esistente');
      return;
    }
    return JSON.parse(user);
  }

  getUserEmail(email: string) {
    return this.http.get<AuthData>(`${this.apiURL}/users?email=${email}`);
  }

  createNewPass(
    id: number,
    data: {
      nome: string;
      cognome: string;
      immaginePrf: string | boolean;
      email: string;
      password: string;
    },
    password: string,
    email: string
  ) {
    console.log(id, data);
    return this.http.patch(`${this.apiURL}/users/${id}`, {
      password,
      data,
      email,
    });
  }
  getuserid() {
    const user = localStorage.getItem('user');
    if (!user) {
      console.log('user non esistente');
      return;
    }
    const userData: AuthData = JSON.parse(user);

    return userData.user.id;
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}/login`, data).pipe(
      tap((loggato) => {
        // console.log(loggato);
        this.authSubj.next(loggato);
        this.utente = loggato;
        // console.log(this.utente);
        localStorage.setItem('user', JSON.stringify(loggato));
        console.log(this.user$);
        this.router.navigate(['/']);
      }),
      catchError(this.handleError)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      this.router.navigate(['/login']);
      return;
    }
    this.authSubj.next(userData);
  }

  register(data: {
    nome: string;
    cognome: string;
    immaginePrf: string | boolean;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.apiURL}/register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']), catchError(this.errors);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  private errors(err: any) {
    console.log(err);
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
