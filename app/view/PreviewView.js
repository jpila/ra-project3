import App from '../App.js';
import CarouselView from './CarouselView.js';


export default class PreviewView{
    constructor(app = new App()){
      this.app = app;
      this.productList = app.productList;
      this.cart = app.cart;
      this.carouselView = app.carouselView;
      this.onShoppingCartClick();
    }

    presentOverLay(e, selectedProduct){
      console.log(selectedProduct);
      console.log(this);
      console.log(e);
      console.log(e.target.getAttribute('data-sku'));
      console.log(`${e} inside presentOverlay`);
      let previewView = document.getElementById('PreviewView');
      previewView.innerHTML = '';
      if(selectedProduct != null){
      let containerDiv = document.createElement('div');
      let imageContainer = document.createElement('div');
      let informationContainer = document.createElement('div');
      let descriptionContainer = document.createElement('div');
      containerDiv.classList.add('flex-initiate', 'flex-wrap')
      containerDiv.style = "width: 50%; height: 40%; background-color: rgba(255,255,255,0.9); margin-bottom: 25%; z-index: 3;";

      imageContainer.innerHTML = `<img style="height: 80%; width: 80%" src=${selectedProduct.image} alt=${selectedProduct.name}>`;
      imageContainer.classList.add('flex-initiate','space-between');
      imageContainer.style = "width: 50%; height: 50%;"
      informationContainer.style = "width: 50%; height: 50%;"
      informationContainer.classList.add('flex-initiate', 'flex-column','justify-align-center');
      descriptionContainer.style = 'border-top: 2px solid black; width: 100%;';
      descriptionContainer.innerHTML = `<h3> More About This Product: <br> ${selectedProduct.longDescription}`;
      let titleText = document.createElement('h4');
      titleText.classList.add('centered');
      titleText.innerHTML = `${selectedProduct.name}`;
      let priceText = document.createElement('h3');
      priceText.style.color = 'red';
      priceText.classList.add('centered');
      priceText.innerHTML = `${selectedProduct.price}`;
      let buttonContainer = document.createElement('div');
      buttonContainer.style = "margin: auto; width: 40%;"
      let addToCartButton = document.createElement('button');
      buttonContainer.appendChild(addToCartButton);
      addToCartButton.classList.add('white-text');
      addToCartButton.innerHTML = "ADD TO CART"
      addToCartButton.style = 'background-color: green; color: white-text; height: 30px; width: 100%; margin: auto;'
      addToCartButton.setAttribute("data-sku", `${selectedProduct.sku}`);
      addToCartButton.addEventListener('click', this.onClickAddToCart.bind(this) , false);


      informationContainer.appendChild(titleText);
      informationContainer.appendChild(priceText);
      informationContainer.appendChild(buttonContainer);
      containerDiv.appendChild(imageContainer);
      containerDiv.appendChild(informationContainer);
      containerDiv.appendChild(descriptionContainer);
      previewView.appendChild(containerDiv);
      previewView.classList.remove('hidden');
      previewView.addEventListener('click', this.removeOverlay);
    } else{
      console.log('icon was clicked');
      console.log(this.cart);
      previewView.classList.remove('hidden');
      this.presentShoppingCart(e, this.cart, previewView);
    }
    }

    removeOverlay(){
       document.getElementById('PreviewView').classList.add('hidden');
    }

    onClickAddToCart(e){
         console.log(e);
         console.log(e.target.getAttribute("data-sku"));
         let currentSku = e.target.getAttribute("data-sku");

         console.log(this);
         console.log(this.cart);
         this.cart.addItemToCart(currentSku);
         // move this function out into  class-level - done
         // get the target,
         // use setAttribute to read data-sku
         // pass it over to ShoppingCart.js
     }

     presentShoppingCart(e, cart, previewView){
       console.log(this);
       let productList = this.productList
       console.log(productList);
       console.log(e);
       console.log(e.target.getAttribute('id'));
       console.log(cart.ss.length);
       console.log(cart.ss);
       console.log(`${e} inside presentShoppingCart`);
       let containerDiv = document.createElement('div');
       containerDiv.classList.add('flex-initiate', 'justify-align-center')

       if(cart.ss.length == 0){
         console.log('cart length is 0');
         containerDiv.style = "width: 50%; height: 40%; background-color: rgba(255,255,255,0.9); margin-bottom: 25%; z-index: 3;";
         containerDiv.innerHTML = '<h3> No Items In Cart</h3>'
         previewView.appendChild(containerDiv);
       } else{
         containerDiv.style = "width: 50%; height: auto; background-color: rgba(255,255,255,0.9); margin-bottom: 15%; z-index: 3;"
         for(key in cart.ss){
           console.log(key);
             sku = [key];
             for(let j = 0; j<productList.length;  j++){
               if(sku == productList[j].sku){}
               let imageContainer = document.createElement('div');
                 imageContainer.innerHTML = `<img style="height: 80%; width: 80%" src=${productList[j].image} alt=${productList[j].name}>`;
                 containerDiv.appendChild(imageContainer);
               }
            }
            previewView.appendChild(containerDiv);
         }
       }


     onShoppingCartClick(e){
       console.log(`${e} inside onShoppingCartClick`);
       console.log(this);
       document.getElementById('icon').addEventListener('click',this.presentOverLay.bind(this))
     }

}
