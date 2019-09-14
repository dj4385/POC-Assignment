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
  subTotal = 0.000
  total = 0.000
  _qty = 0
  billQty = 0
  billTotalAmt = 0
  billDis = 0
  billVAT = 0
  isBillGenerated = false

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
          flag = 0
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
        event.qty++
        event.totalItemPrice = event.qty * parseInt(event.price)
        this.calculateAmount()
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
        if(item.qty === 1){
          item.qty = 1;
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
      this.subTotal = 0.000
      this.total = 0.000
      this._qty = 0
    }
  }

  addVatAndDis(vat, dis){
    if(vat === ""){
      vat = 0
    }
    if(dis === ""){
      dis = 0
    }
    this.total = parseInt(vat) + parseInt(dis) + this.subTotal
  }

  cancelSale(){
    this.selectedProducts.length = ''
    this.subTotal = 0.000 
    this.total = 0.000
    this._qty = 0
  }
  processSale(){
    if(this.selectedProducts.length === 0){
      alert('Cannot Process sale')
    } else {
      this.isBillGenerated = true
      this.checkOutFn()
    }
  }

  checkOutFn(){
    this.selectedProducts.forEach(element=>{
      this.billQty += element.qty
      this.billTotalAmt += element.totalItemPrice
    })
  }
  close(){
    this.selectedProducts.length = ''
    this.subTotal = 0.000
    this.total = 0.000
    this._qty = 0
    this.billQty = 0
    this.billTotalAmt = 0
    this.isBillGenerated = false
  }
  
}
