import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl); // Update to the correct endpoint
  }
  updateUser(user: User) {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
  login(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8081/api/users/login', user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  getCurrentUser(): Observable<User | null> {
    const userJson = localStorage.getItem('currentUser');
    const user = userJson ? JSON.parse(userJson) : null;
    return new Observable<User | null>(observer => {
      observer.next(user);
      observer.complete();
    });
  }
  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }
  setCurrentUser(user: User) {
    this.currentUser = user; // Store the user object
    localStorage.setItem('currentUser', JSON.stringify(user)); // Optionally store in local storage
  }
  currentUser: User | null = null; // Declare currentUser property
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
