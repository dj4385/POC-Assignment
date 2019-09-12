import { Component, OnInit } from '@angular/core';
import { ProductSerService } from '../product-ser.service';

@Component({
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.css']
})
export class PosHomeComponent implements OnInit {

  date = new Date
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
    let flag = 0;
    if(this.selectedProducts.length == 0){
      // event.qty = 1
      // event.totalItemPrice = event.qty * parseInt(event.price)
      // this.selectedProducts.push(event)  
      flag = 1
    } else {
      this.selectedProducts.forEach(element => {
        if(element.name == event.name){
          console.log('Element found')
        }
        else {
          flag = 1;
        }
        
      });
      
      
    }

    if(flag === 1){
      event.qty = 1
      event.totalItemPrice = event.qty * parseInt(event.price)
      this.selectedProducts.push(event)
    } else {
      console.log('you need to increase the qty')
    }
    
  }
  incrementQty(item){
    
  }
  decrementQty(item){
    
  }

  deleteItem(item){
    let flag = 0
    this.selectedProducts.forEach(element => {
      if(element.name === item.name){
        flag = 1
      }
    });
    if(flag === 1){
      this.selectedProducts.splice(this.selectedProducts.indexOf(item),1)
    }
  }

  cancelSale(){
    this.selectedProducts.length = ''
  }
  processSale(){
    if(this.selectedProducts.length === 0){
      alert('Cannot Process sale')
    } else {
      alert('Process is start')
    }
  }

}
