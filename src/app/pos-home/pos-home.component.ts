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
  subTotal = '0.000' 
  total = ''
  _qty = '0'
  billQty = 0
  billTotalAmt = 0
  billDis = 0
  billVAT = 0

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
      flag = 1
    } else {
      this.selectedProducts.forEach(element => {
        if(element.name == event.name){
          this.selectedProducts.forEach(element => {
            if(element.name === event.name){
              event.qty++
              event.totalItemPrice = event.qty * parseInt(event.price)
              this._qty = event.qty
              this.subTotal = event.totalItemPrice
              this.total = this.subTotal
            }
          });
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
      this.calculateAmount()
    } else {
      
    }
    
  }
  calculateAmount(){
    this.selectedProducts.forEach(element => {
      this.subTotal = element.totalItemPrice 
      this._qty = element.qty
      this.total = this.subTotal
    });
  }
  incrementQty(item){
    this.selectedProducts.forEach(element => {
      if(element.name === item.name){
        item.qty++
        item.totalItemPrice = item.qty * parseInt(item.price)
        this._qty = item.qty
        this.subTotal = item.totalItemPrice
        this.total = this.subTotal
      }
    });  
  }
  decrementQty(item){
    this.selectedProducts.forEach(element => {
      if(element.name === item.name){
        if(item.qty === 0){
          item.qty = 0;
          item.totalItemPrice = item.qty * parseInt(item.price)
          this._qty = item.qty
          this.subTotal = item.totalItemPrice
          this.total = this.subTotal
        } else {
          item.qty--;
          item.totalItemPrice = item.qty * parseInt(item.price)
          this._qty = item.qty
          this.subTotal = item.totalItemPrice
          this.total = this.subTotal
        }
      }
    });
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
      this.subTotal = '0.000' 
      this.total = ''
      this._qty = '0'
    }
  }

  cancelSale(){
    this.selectedProducts.length = ''
    this.subTotal = '0.000' 
    this.total = ''
    this._qty = '0'
  }
  processSale(){
    if(this.selectedProducts.length === 0){
      alert('Cannot Process sale')
    } else {
      alert('Process is start')
      this.checkOutFn()
    }
  }

  checkOutFn(){
    this.selectedProducts.forEach(element=>{
      this.billQty += element.qty
      this.billTotalAmt += element.totalItemPrice
    })
  }

}
