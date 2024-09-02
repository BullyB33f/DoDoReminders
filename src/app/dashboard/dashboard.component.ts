import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private taskService: TaskService,
              private router: Router){}
  
  ngOnInit(): void {
    this.populate();
  }
  

  tasks: any = [];

 populate(){
  const task = this.taskService.allTasks().subscribe(res => {
    if(res['status'] == 'success'){
      this.tasks = res['data']['tasks'];
      console.log('populate working...');

      
    }
  })
 }

 newTask(oForm: NgForm){
        const addtask = this.taskService.createTask(oForm.value).subscribe((res) => {
          if(res['status'] == 'success'){
            
            Swal.fire({
           
              icon: "success",
              title: `Added ${oForm.value.taskname} to task list` ,
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              window.location.reload();
          }, 2000);
            console.log(oForm.value)
          }
        })
 }

 

}

