import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-view-all-customers',
  templateUrl: './view-all-customers.component.html',
  styleUrls: ['./view-all-customers.component.css']
})
export class ViewAllCustomersComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users = [];
  dataSource = new MatTableDataSource();
  dataLength = 0;
  selected = 'All';
  displayedColumns: string[] = [ 'First Name', 'Last Name', 'Mobile', 'Email' , 'status'];
  res = [];

  loading = false;
  activedata = [];
  active = [];

  constructor(private cs: CustomerService) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.res = this.getData();
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; // For sort
    }, 1000);
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  activestatus(): any{
    this.active = [];
    this.activedata = [];
    this.activedata = this.res;
    this.active = this.activedata.filter((data) => {
      if (data.status === 1)
       {
         console.log(data.status);
         return data;
       }
    });
    this.dataSource = new MatTableDataSource(this.active);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // For sort
  }

  allStatus(): any{
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  disableStatus(): any{
    this.active = [];
    this.activedata = [];
    this.activedata = this.res;
    this.active = this.activedata.filter((data) => {
      if (data.status === 0)
       {
         console.log(data.status);
         return data;
       }
    });
    this.dataSource = new MatTableDataSource(this.active);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // For sort
  }

  getData(): any{
    this.loading = true;
    return this.cs.getData();
  }

}
