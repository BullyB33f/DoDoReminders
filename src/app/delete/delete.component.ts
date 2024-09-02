import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {


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



deleteTask(oForm: NgForm){
this.taskService.deleteTask(this.id).subscribe((res) => {
if(res['status'] == 'success'){
this.router.navigateByUrl('/dashboard')
}
})
}

}
