import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/services/user-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  constructor(private activeRoute :ActivatedRoute,private userServe:UserServiceService,private router:Router) { }
  id:number;
  data:any;
  config:any;
  editing(){
    this.router.navigate(['home/user-management/add-user'],{queryParams:{username:this.username }});
  }
  userLog:any;
  user:string='user';
  status:boolean=false;
  username='';
  @ViewChild('f') signUp : NgForm;
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      this.username = param['username']
      setTimeout(() => {
        this.data = this.userServe.getItemData(this.username).subscribe(data=>{
          this.data = data
          this.data = this.data.data
          
          this.status=this.data.status==1;
          this.user=this.data.role
          this.username = this.data.username
        })
        this.userServe.getlogs(this.username).subscribe(logdata=>{
         
          this.userLog = logdata;
          this.userLog = this.userLog.data
        })
        
      }, 1000);
    }, err => {
      console.log(err);
    });
   
  }
  submitStatus(){
    // this.userServe.editStatus(,this.status);
    setTimeout(()=>{
      // this.router.navigate(['home/user-management/all-users']);
    },200)
    
  }
  button:string='none';
 activate(){
   this.button='block';
 }
 close(){
   this.button='none';
 }
 onSubmit(){
   var data = {
     username : this.username,
     password : this.signUp.value.password,
     confirmPassword : this.signUp.value.confirmPassword
   }
   this.userServe.editPassword(data).subscribe(change=>{
   })
 }
}
