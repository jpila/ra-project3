export default class AllProducts
{
    constructor(){
        this.productList = []; // store a native array of products. no vector support in native ES6.
    }

    // helper getter methods
    get firstItem(){
        if (this.productList.length!=0){
            return this.productList[0];
        }
        return undefined;
    }

    get lastItem(){
        if (this.productList.length!=0){
            return this.productList[this.productList.length-1];
        }
        return undefined;
    }

    get productCount(){
        return this.productList.length;
    }

    get toString(){
        return this.productList.toString();
    }

}
