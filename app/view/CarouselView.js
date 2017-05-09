import Flickity from 'flickity';
import Product from '../model/Product.js';
import Products from '../model/AllProducts.js';
import PreviewView from './PreviewView'
import App from '../App';

export default class CarouselView {
  constructor(app = new app()){
    console.log('creating Carousel');
    this.app = app;
    this.previewView = app.previewView
    this.productList = app.productList;
    this.currentCart = app.cart
    this.initFlickityElements(app);
  }

  initFlickityElements(app){
    let startDiv = document.getElementById('products')
    startDiv.innerHTML = ''
    console.log('inside init flickity elements');
    console.log(app.productList);
    console.log(app.productList.length);

  //  app.productList.map((x) => {console.log(x)});
    for(let i = 0; i < app.productList.length; i++){
      let cellContainer = document.createElement('section');
      cellContainer.classList.add('product','carousel-cell');
      this.createCells(cellContainer, this.app.productList[i]);
      startDiv.appendChild(cellContainer);
    }
  this.createCarousel(startDiv)
  }


  createCells(cellContainer ,currentProduct){

    let imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container', 'centered');
    imageContainer.innerHTML = `<img src=${currentProduct.image} alt=${currentProduct.name}>`;
    let textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    let titleText = document.createElement('h4');
    titleText.classList.add('centered');
    titleText.innerHTML = `${currentProduct.name}`;
    let priceText = document.createElement('h3');
    priceText.style.color = 'red';
    priceText.classList.add('centered');
    priceText.innerHTML = `${currentProduct.price}`;
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex-initiate', 'space-between');
    let viewPreviewButton = document.createElement('button');
    let addToCartButton = document.createElement('button');

    buttonContainer.style = 'background-color: green; width: 60%; margin: auto;'

    viewPreviewButton.innerHTML = "QUICK VIEW"
    viewPreviewButton.style= 'background-color: white; color: dark-grey-text; width: 48%; height: 50px; margin: 4px;'
    viewPreviewButton.addEventListener('click', this.onClickQuickView.bind(this), false)
    viewPreviewButton.setAttribute('data-sku', `${currentProduct.sku}`);
    addToCartButton.classList.add('white-text');
    addToCartButton.innerHTML = "ADD TO CART"
    addToCartButton.style = 'background-color: green; color: white-text; width: 48%;'
    addToCartButton.setAttribute("data-sku", `${currentProduct.sku}`);
    addToCartButton.addEventListener('click', this.onClickAddToCart.bind(this), false)


    textContainer.appendChild(titleText);
    textContainer.appendChild(priceText);
    buttonContainer.appendChild(viewPreviewButton);
    buttonContainer.appendChild(addToCartButton);

    cellContainer.appendChild(imageContainer);
    cellContainer.appendChild(textContainer);
    cellContainer.appendChild(buttonContainer);

  }

      onClickQuickView(e){
        console.log(this);
        console.log(e.target.getAttribute('data-sku'));
        console.log(e);
        var sku = parseInt(e.target.getAttribute('data-sku'));
        for(let i = 0; i < this.productList.length; i++){
          console.log(this.productList[i].sku);
          var currentProduct = this.productList[i];
            if(currentProduct.sku === sku) {
              var selected = currentProduct;
            this.previewView.presentOverLay(e,selected);
          }
        }
      }

     onClickAddToCart(e){
          console.log(e);
          console.log(e.target.getAttribute("data-sku"));
          let currentSku = e.target.getAttribute("data-sku");

          console.log(this);
          console.log(this.currentCart);
          this.currentCart.addItemToCart(currentSku);
          // move this function out into  class-level - done
          // get the target,
          // use setAttribute to read data-sku
          // pass it over to ShoppingCart.js
      }


  createCarousel(node){
      // console.log(this.flickityElements);
      window.addEventListener("load",(e) => {
          console.log("page loaded...processing");
        //  document.getElementById("products").appendChild(node);

          let elem = document.querySelector('.main-carousel');
          let f = new Flickity( elem, {
              // options
              cellAlign: 'left',
              contain: true
          });



      },false);

  }

}
