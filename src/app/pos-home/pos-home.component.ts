import { Component, OnInit } from '@angular/core';
import { ProductSerService } from '../product-ser.service';

@Component({
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.css']
})
export class PosHomeComponent implements OnInit {

  products:any = []
  constructor(
    private productSer : ProductSerService
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
    this.productSer.getAllProducts().subscribe(res=>{
      this.products = res;
      console.log(this.products)
    },err=>{
      console.log(err)
    })
  }

}
