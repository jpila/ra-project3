import CartView from './view/CartView';

export default class Cart {

    constructor(app = new App()){
        console.log("creating Cart");
        // warning: if your audience has old browsers,
        // you will need to add a check to see if
        // window.sessionStorage is supported/exists
        this.ss = window.sessionStorage;
        this.cartView = app.cartView;

    }

    addItemToCart(sku,qty = 1){
        console.log("adding item to cart");
        //this.ss.setItem(sku,qty.toString());
        //debugger;

        /*
        //check if sku exists in sessionStorage
        // --- check length of session storage
        // --- if zero, immediately add sku and value
        // --- else
        // --- loop through session storage
        // --- check if sku exists as key
        // --- if sku exists as key, update existing value
        // --- else create new key with sku# and add value of one
        // debug
         */
        var sessionLength = this.ss.length;
        if(sessionLength<=0){
            this.ss.setItem(sku,qty.toString());
            this.cartView.updateShoppingCartPreview(qty);
            return ; // finishes method execution
        }
        console.log(this.ss);
        // debugger;
        // loop through all keys (properties)
        // also store the total qty
        let newTotalQty = 0;
        let match = 0;
        // note a different type of loop!


        for (let key in this.ss){
            if (key == sku.toString() ){
                console.log(`matched ${sku} and ${key}`);
                // get current quantity (its a string)
                // convert it to a number;
                let oldQty = this.ss.getItem(key);
                oldQty = parseInt(oldQty);
                let newQty = oldQty + qty;
                // then back to a string
                newQty = newQty.toString();
                this.ss.setItem(key,newQty);
                match = 1;
            }
        }
        // we didn't find a match
        // so create a new key value and update view

        if (match<=0){
            console.log("new item to add - " + sku);
            this.ss.setItem(sku,qty.toString());
        }
        // sum up all the current quantities to get new total
        for (let i=0; i< this.ss.length; i++){
            let skuKey = this.ss.key(i);
            console.log(skuKey);
            let qtyValue = this.ss.getItem(skuKey);

            newTotalQty+= parseInt(qtyValue);
        }
        console.log(this.cartView);
        this.cartView.updateShoppingCartPreview(newTotalQty);





    }

    subtractItemFromCart(sku,qty = 1){

    }

    removeAllItemsOfSpecificType(sku){

    }

    clearEntireCart(app){

    }

}
