document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/api/products/1/')
        .then(response => response.json())
        .then(data => {
            // console.log("product id",data.id);
            // console.log(data.image)

            product_id = data.id;

            const imageUrl = `${window.location.origin}${data.image}`;
            document.getElementById('product-image').src = imageUrl;

            document.getElementById('product-name').innerText = data.name;
            document.getElementById('product-price').innerText = `$${data.price}`;
            document.getElementById('product-description').innerText = data.description;
            document.getElementById('product-full-description').innerText = data.full_description;
            document.getElementById('product-reviews').innerText = `(${data.reviews} Reviews)`;
        })
        .catch(error => console.error('Error fetching product data:', error));
});




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


    const postData = {
       product: product_id,
       quantity: val
    };

    // URL to which the POST request will be sent
    const postUrl = 'http://127.0.0.1:8000/api/cart-item/';

    // Options for the fetch API
    const options = {
        method: 'POST', // Method type
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(postData) // Convert the data to a JSON string
    };

    // Make the POST request
    fetch(postUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // You can add code here to update the UI or handle the response data
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
