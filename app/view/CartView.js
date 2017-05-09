export default class CartView{
    constructor(app = new App){
      console.log('creating cartview');
      this.productList = app.productList;
      this.previewView = app.previewView;
      this.cart = app.cart;
      //this.onShoppingCartClick();
    }

    updateShoppingCartPreview(qty){
      document.getElementById('item-count').innerHTML = qty;
    }



}
