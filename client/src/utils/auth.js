// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

class AuthService{
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // if the user is logged in / then 
  loggedIn() {
    // this will check if the token has been saved and valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // this will check if the token is expired 
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // this will obtain the token from local storage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // thsi will save the token when logged in to local storage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // when logged out, this will remove the token from local storage
    localStorage.removeItem('id_token');
   
    window.location.assign('/');
  }
}

const Auth = new AuthService();

export default Auth;