import { Component, OnInit } from '@angular/core';
import { ProductSerService } from '../product-ser.service';

@Component({
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.css']
})
export class PosHomeComponent implements OnInit {

  products:any = []
  selectedProducts: any = []

  constructor(
    private productSer : ProductSerService
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
    this.productSer.getAllProducts().subscribe(res=>{
      this.products = res;
    },err=>{
      alert(err.message)
    })
  }

  addItem(event){
    event.qty = 1
    if(this.selectedProducts.length == 0){
      this.selectedProducts.push(event)  
    } else {
      this.selectedProducts.forEach(element => {
        if(element.name === event.name){
          this.selectedProducts.fill(element.qty = event.qty +=1)
        }
        
      });
    }
    
  }

}
