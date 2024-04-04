import { Component } from '@angular/core';
import { GeneralServiceService } from './services/general-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SiteMakers';
  token: any;
  loginTime: any;
  header: any;
  constructor(private api: GeneralServiceService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
    const loginTimeStr = localStorage.getItem('logintime');
    if (loginTimeStr !== null) {
      const expireTime = 432000;
      const loginTime = parseInt(loginTimeStr);
      if (!isNaN(loginTime)) {
        const refreshTime = loginTime + expireTime;
        // Calculate current time in seconds
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime);
        
        // Check if it's time to refresh token
        if (currentTime >= refreshTime) {
          // Call  API to refresh token
          this.refreshToken();
        }
      } else {
        console.error("Invalid login time stored in localStorage.");
      }
    }
  }
  refreshToken(): void {
    this.api.post('auth/refresh', '', this.header).subscribe((response: any) => {
      this.token = response.access_token;
      localStorage.setItem('token', this.token);
      // Update login time
      localStorage.setItem('logintime', Math.floor(Date.now() / 1000).toString());
    }, error => {
      console.error("Error refreshing token:", error);
    });
  }
}
