import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  userStatus: boolean = false;
 

  constructor(private authService: AuthService,
              private router: Router){}


  ngOnInit(): void {
      this.LoginDisplay();
  }

  LoginDisplay(){

    const token =  localStorage.getItem('tokenKey');
    if(token == ''){
      this.userStatus = false;
    }
    else{
      this.userStatus = true;
    }
  }

  logOutFunction(){
    this.userStatus = false;
    this.router.navigateByUrl('/login');

    // this.authService.logout();
    // this.router.navigateByUrl('/login');
    // window.location.reload();
  }
}
