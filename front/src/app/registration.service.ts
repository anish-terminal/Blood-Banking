import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { map } from "rxjs/operators";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  user = new User();

  constructor(private _http : HttpClient) { }



  public loginUserFromRemote(email: string, password: string): Observable<any> {
    // provided credentials is default user for testing
    if (email === 'user@gmail.com' && password === 'user123') {
      sessionStorage.setItem('USER', email);
      sessionStorage.setItem('ROLE', 'USER');
      sessionStorage.setItem('TOKEN', 'Bearer <dummy-token>'); 
      console.log('Default user login for testing');
      return of({ success: true }); 
    }
  
    return this._http.post<any>(`${NAV_URL}/login`, { email, password }).pipe(
      map(
        data => {
          sessionStorage.setItem('USER', email);
          sessionStorage.setItem('ROLE', 'USER');
          sessionStorage.setItem('TOKEN', `Bearer ${data.token}`);
          console.log(data);
          return data;
        }
      )
    );
  }
  
isUserLoggedIn()
{
  let user = sessionStorage.getItem('USER');
  if(user === null || user.length === 0) 
  {
      return false;
  }
  return true;
}

getAuthenticatedToken() {
  return sessionStorage.getItem('TOKEN');
}

getAuthenticatedUser() {
  return sessionStorage.getItem('USER');
}

userType() 
{
    return sessionStorage.getItem('ROLE');
  }

public adminLoginFromRemote(email: string, password: string)
{
  if(email === 'admin@gmail.com' && password === 'admin123') 
  {
    sessionStorage.setItem('user', email);
    sessionStorage.setItem('role', "admin");
    return true;
  }
  return false;
}


public registerUserFromRemote(user: User): Observable<any> {
  return this._http.post<any>(`${NAV_URL}/register`, user);
}
}
