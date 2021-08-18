import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserServiceService } from 'src/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users = [];
  dataSource = new MatTableDataSource();
  dataLength = 1;
  displayedColumns: string[] = ['Full Name', 'Username','role', 'Mobile', 'Email', 'Status'];
  
  changeState(i:number){ 
   var state= this.userServe.res[i].status;
    if(state==0){
    this.userServe.res[i].status = 1;
    }
    else{
    this.userServe.res[i].status = 0; 
    }
  }

  loading = false;
  constructor(private userServe:UserServiceService,private router:Router) { }
  res:any;
  userDetails(i:number){
    this.router.navigate(['userdetail'],{queryParams:{number: i, username : this.res[i].username} });
  }
  resall:any;
  resall2:any;
  ngOnInit(): void {
    setTimeout(() => {
      this.userServe.getData().subscribe(data=>{
        this.res=data;
        this.res = this.res.data
        for(var i=0; i< this.res.length;i++){
          if(this.res[i].status == null){
            this.res[i].status=1;
          }
        }
        this.resall=this.res
        this.resall2=this.res
        this.dataSource = new MatTableDataSource(this.res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLength = this.res.length;
      });
    
    }, 1000);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  viewUser(data): void{
  }
  admindata=[];
  admins=[];
  admin(){
    this.admindata=this.resall2
    this.admins=this.admindata.filter((data)=>{
      if(data.role == 'admin' || data.role == 'superadmin')
       {

         return data;
       }
    });
    this.res=this.admins
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  userdata=[];
  usersall=[];
  user(){
    this.userdata=this.resall2
    this.usersall=this.userdata.filter((data)=>{
      if(data.role == 'viewer')
       {
       
         return data;
       }
    });
    this.res=this.usersall
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  activedata=[];
  active=[]
  activestatus(){
    this.activedata=this.resall
    this.active=this.activedata.filter((data)=>{
      if(data.status == 1)
       {
      
         return data;
       }
    });
    this.res=this.active
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
disableddata=[];
  disabled=[]
  disabledstatus(){
    this.disableddata=this.resall
    this.disabled=this.disableddata.filter((data)=>{
      if(data.status == 0)
       {
    
         return data;
       }
    });
    this.res=this.disabled
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
}
allstatus(){
  this.res=this.resall
   this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
}
}
