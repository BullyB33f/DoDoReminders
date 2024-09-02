import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute){}


  id: number = 0;
  taskData:any = [];

  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.taskService.oneTask(this.id).subscribe(res => {
        if(res['status'] == 'success'){
          this.taskData = res!['data']!['task'];
          this.taskForm?.setValue({
            taskname: this.taskData['taskname'],
            description: this.taskData['description']
          })
        }
      })
    }
  }
  @ViewChild('taskForm') taskForm?:NgForm;



  editTask(oForm: NgForm){
    this.taskService.editTask(this.id, oForm.value).subscribe((res) => {
      if(res['status'] == 'success'){
        this.router.navigateByUrl('/dashboard')
      }
    })
  }
}


