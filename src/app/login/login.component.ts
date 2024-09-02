import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService,
              private router: Router){}

  ngOnInit(): void {}

  hasError: boolean = true;

  onLogin(oForm: NgForm){
    console.log(JSON.stringify(oForm.value), this.hasError)
    const loginfunc = this.authService.login(oForm.value).subscribe((loginRes) => {
      if(loginRes['status'] == 'success'){
        this.authService.authToken = loginRes['data']!['token'];
        this.router.navigateByUrl(`/home`);
        
          Swal.fire({
           
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500
          });
        
      }else if (loginRes['status'] == 'error'){
        this.hasError = false;
      }
    })
  }

}
