import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'Assign1';
  method = 'none';
  itemsdata:any;
  items:any=[];

  constructor(private httpClient:HttpClient) {

  }
  public showJson(){
    this.httpClient.get('/product/json').subscribe((data)=>{
      this.itemsdata = data;
      this.itemsdata = this.itemsdata.products;
      this.method = 'JSON';
    });
  }
  public showXML(){
    this.httpClient.get('/product/xml',{responseType:'text'}).subscribe((data)=>{
       let parser = new xml2js.Parser({ strict: true, trim: true ,explicitArray : false});
      parser.parseString(data, (err, result) => {

        this.itemsdata = result.products.product;
        this.method = 'XML';
      });


    })
  }

}
