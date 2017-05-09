import Product from "./Product";
import Products from './AllProducts'
import App from '../App'

export default class BBService {

    constructor(app = new App()){
      console.log('initating bbservice');
      this.productList = new Products();;
      this.currentCart = app.cart;
      this.data = ''
      this.getJSON(app)
    }


    getJSON(app) {
    var url = 'https://api.bestbuy.com/v1/products((search=macbook)&(categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&sort=sku.asc&show=sku,name,image,salePrice,longDescription,manufacturer,shortDescription&pageSize=14&format=json'
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      this.data = this.responseText;
      var data = JSON.parse(this.responseText);
      for(let i = 0; i < data.products.length; i++){
      
      const {sku: sku, name: name, image: image, salePrice: price, longDescription: longDescription, manufacturer: manufacturer, shortDescription: shortDescription} = data.products[i];
      //console.log(`${sku}, ${name}, ${price}, ${longDescription},${manufacturer} ${shortDescription}`);
      let product = new Product(sku, name,image, longDescription, shortDescription, manufacturer, price);
      app.productList.push(product);
      //debugger;
      console.log(app.productList);
      }
    };
    xhr.open('GET', url, false);
    xhr.send();
    }

    getProductInfo(url, callback) {
    getJSON(url, data => callback(JSON.parse(data)));
    }

}
