import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/services/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  isMobile:boolean=false;
  selectRole = "Select the role";
  @ViewChild('f') signup : NgForm;

  selectOption=[
    {
      id: 0,
      role:"Select the role"
    },
    {
    id: 1,
    role:"admin"
  }, {
    id: 2,
    role:"viewer"
  }, {
    id: 1,
    role:"superadmin"
  }
];
loader:boolean=false;
  onSubmit(){
    
    if(this.editing){
      var data = {
        email : this.signup.value.email,
        fullname : this.signup.value.name,
        username : this.signup.value.username,
        role:this.signup.value.role,
        mobile:this.signup.value.number1
      };
     this.userSer.editItemData(this.id,data);
     this.router.navigate(['home/user-management/all-users']);
    }
    else{
      var data2 = {
        email : this.signup.value.email,
        name : this.signup.value.name,
        username : this.signup.value.username,
        role:this.signup.value.role,
        mobile:this.signup.value.number1,
        password : this.signup.value.pass,
        status:1
      };
    this.loader=true;
    this.userSer.addData(data2).subscribe();
    setTimeout(() => {
      this.loader=false;
      this.router.navigate(['home/user-management/all-users']);
    }, 2000);   
  }
  }
  changeInputNew2(){
    this.passwordChange2='password'
  }
  changeInputNew(){
    this.passwordChange='password'
  }
constructor(private route:ActivatedRoute,private userSer:UserServiceService,private router:Router){}
  
  passwordChange='password';
  changeInput() {
    if(this.passwordChange=='password')
   this.passwordChange='text';
   else{
     this.passwordChange='password';
   }
  }
  passwordChange2='password';
  changeInput2() {
    if(this.passwordChange2=='password')
   this.passwordChange2='text';
   else{
     this.passwordChange2='password';
   }
  }
  id:number;
  userData : any;
  editing:boolean=false;
  username:any;
  ngOnInit(){
    this.route.queryParams.subscribe(params=>{
      this.id = params['id'];
      this.username = params['username'];
    });
    setTimeout(() => {
      this.userSer.getItemData(this.username).subscribe(data=>{
        this.userData = data
        this.userData = this.userData.data
        this.editing=true;
        if(this.userData!=null){
        
          this.passwordChange='text';
          this.passwordChange2='text';
        this.signup.setValue({
          email : this.userData.email,
          name : this.userData.name,
          username : this.userData.username,
          role:this.userData.role,
          pass:' ',
          pass2:' ',
          number1 : this.userData.mobile
        })
      }
      })
    }, 200);
  }
}
