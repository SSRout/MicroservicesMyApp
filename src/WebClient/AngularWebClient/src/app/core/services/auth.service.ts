import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

export interface User {
  email: string;
  full_name: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage(),
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.verifyToken();
  }

  /**
   * Register new user
   */
  register(
    email: string,
    fullName: string,
    password: string,
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, {
        email,
        full_name: fullName,
        password,
      })
      .pipe(
        tap((response) => this.handleAuthResponse(response)),
        catchError((error) => throwError(() => error)),
      );
  }

  /**
   * Login user
   */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => this.handleAuthResponse(response)),
        catchError((error) => throwError(() => error)),
      );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get access token
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Verify token with backend
   */
  private verifyToken(): void {
    const token = this.getToken();
    if (!token) {
      return;
    }

    this.http
      .post(
        `${this.apiUrl}/verify`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .pipe(
        tap((response: any) => {
          if (response.valid && response.user) {
            this.currentUserSubject.next(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            sessionStorage.setItem('username', response.user.email);
          }
        }),
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Token verification failed'));
        }),
      )
      .subscribe();
  }

  /**
   * Handle authentication response
   */
  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));
    sessionStorage.setItem('username', response.user.email);
    this.currentUserSubject.next(response.user);
  }

  /**
   * Get user from local storage
   */
  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
