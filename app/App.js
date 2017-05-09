import Product from './model/Product';
import Products from './model/AllProducts';
import BBService from './model/BBService';
import PreviewView from './view/PreviewView.js';
import CarouselView from './view/CarouselView';
import Cart from './Cart';
import CartView from './view/CartView';


export default class App {
    constructor()
    {
        console.log("Creating the App");
        this.productList = [];

        this.bbService = new BBService(this);
        //console.log(this.productList);
        this.cartView = new CartView(this);
        this.cart = new Cart(this);
        this.previewView = new PreviewView(this);



        this.carouselView = new CarouselView(this);

    }
}
