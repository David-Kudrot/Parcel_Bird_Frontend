function Minus(){
    const inputElement = document.getElementById('product_quantity');
    let val = parseInt(inputElement.value, 10);
    if (!isNaN(val)) {
        val -= 1; 
        if(val<=0) val=0;
        inputElement.value = val; 
    } else {
        console.error("The value is not a number");
    }
}


function Plus() {
    const inputElement = document.getElementById('product_quantity');
    let val = parseInt(inputElement.value, 10);

    if (!isNaN(val)) {
        val += 1; 
        inputElement.value = val; 

    } else {
        console.error("The value is not a number");
    }
}


function addToCart() {
    const inputElement = document.getElementById('product_quantity');
    let val = parseInt(inputElement.value, 10);

    const cart = document.getElementById('cart_icon');
    let cartVal = parseInt(cart.innerHTML, 10);

    if (!isNaN(val) && !isNaN(cartVal)) {
        cartVal += val; 
        cart.innerHTML = cartVal;
    } else {
        console.error("The value is not a number");
    }
}
