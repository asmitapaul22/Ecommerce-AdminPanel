import { ProductService } from './../../../services/product.service';
import { AfterViewInit, Component, OnInit, ViewChild, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})


export class ProductsTableComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) { }

  dataSource = new MatTableDataSource();
  show = true;
  dataLength = 0
  displayedColumns: string[] = ['productImage','title', 'category', 'rating', 'availability'];
  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe(res => {
            setTimeout(() => {
              this.show = false
            }, 1000);
            this.dataLength = res.data.length;
      for(let i=0; i<res.data.length; i++) {
        if(res.data[i].status == false) {
          res.data[i].availability = 'Temporarily unavailable'
        }
        else {

          let count = 0
          let available = 0
          for(let j=0; j<res.data[i].subProducts.length; j++) {
            if(res.data[i].subProducts[j].isAvailable == true) {
              available += 1
              if(res.data[i].subProducts[j].quantity > 0) {
                count += 1;   
              }
            }
          }         
          
          if(count == 0) {
            res.data[i].availability = 'Unavailable'
          }
          else if(count == available) {
            res.data[i].availability = 'Available'
          }
          else if(count < available) {
            res.data[i].availability = 'Partially out of stock'
          }
        }
      }                   
      setTimeout(() => {
        
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; // For sort
      }, 1000);
      
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
    this.dataSource.sort = this.sort; // For sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
