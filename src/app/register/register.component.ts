import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(private authService:AuthService,
              private router: Router){}
  
  
  ngOnInit(): void{}

  registerUser(oForm: NgForm){
    console.log(JSON.stringify(oForm.value))
    const newUser = this.authService.registerUser(oForm.value).subscribe((res) => {
      if(res['status'] == 'success'){
        Swal.fire({
           
          icon: "success",
          title: `Registered Successfully` ,
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          this.router.navigateByUrl('/login')
      }, 2000);
        
      }
    })
  }


}
