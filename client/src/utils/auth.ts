import { type JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';
class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // TODO: return a value that indicates if the user is logged in
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token:string) {
    try{
    // TODO: return a value that indicates if the token is expired
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded?.exp && decoded?.exp < Date.now()/ 1000){
      return true;
    }
  } catch (err) {
    return false;
  }
  }

  getToken(): string  {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.reload(); 
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
