import * as jwtDecode from 'jwt-decode';

export const authService = {
  getToken() {
    return localStorage.getItem('jwt-token');
  },
  decodeToken() {
    if(this.getToken()){
      return jwtDecode(this.getToken());
    }
    return null;
  },
  isAuthenticated() {
    if (this.getToken()){

      return this.isExpired()? false : true;
    }

    return false;
  },
  isExpired() {
    const currentDate = Date.now() / 1000;
    const decodedToken = this.decodeToken();

    return decodedToken.exp < currentDate;
  },
  logoutUser() {
    localStorage.clear();
    window.location.replace('/');
  },

  redirectUser() {
    const referrer = window.location.pathname;

    this.logoutUser();
    localStorage.setItem('locationReferrer', referrer);
    window.location.replace('/login');
  }
};
