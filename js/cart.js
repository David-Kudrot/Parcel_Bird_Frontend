let cartItems = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/api/cart-item/')
        .then(response => response.json())
        .then(responseData => {
            const fetchRequests = responseData.map(element => {
                const cartId = element.id;
                const quantity = element.quantity;
                const id = element.product;

                return fetch(`http://127.0.0.1:8000/api/products/${id}/`)
                    .then(response => response.json())
                    .then(data => {
                        const price = data.price;
                        const name = data.name;
                        const sub_total = data.price * element.quantity;
                        const image = data.image

                        const cart = {
                            cartId: cartId,
                            quantity: quantity,
                            price: price,
                            name: name,
                            sub_total: sub_total,
                            image: image 
                        }

                        cartItems.push(cart);
                    })
                    .catch(error => console.error('Error fetching single product data:', error));
            });

            // Wait for all fetch requests to complete before rendering cart items
            Promise.all(fetchRequests)
                .then(() => {
                    console.log("All fetch requests completed");
                    renderCartItems();
                })
                .catch(error => console.error('Error fetching product data:', error));
        })
        .catch(error => console.error('Error fetching cart item data:', error));
    
    console.log(cartItems)

    // Function to render cart items

    const cartItemList = document.getElementById('cart-item-list');
    const totalPriceElement = document.getElementById('total-price');

    // new element create function start from here 
    function renderCartItems() {
        // console.log("Rendering cart items");
        // console.log("Number of cart items: yes", cartItems);
        
        cartItemList.innerHTML = ''; // Clear existing cart items
        let totalPrice = 0;

        cartItems.forEach(item => {
            console.log("yes=======================",item)
            console.log("alhamdulillah, work well")
            const row = document.createElement('tr'); // Create a table row for each item
            row.id = `row_${item.cartId}`;

            // Product Name and Image

            // console.log(item.image)

            const nameCell = document.createElement('td');
            nameCell.className = 'align-middle';
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = 'image';
            img.style.width = '50px';
            nameCell.appendChild(img);
            nameCell.appendChild(document.createTextNode(` ${item.name}`));
            row.appendChild(nameCell);

            // Price
            const priceCell = document.createElement('td');
            priceCell.className = 'align-middle';
            priceCell.textContent = item.price;
            priceCell.id = `priceCell_${item.cartId}`;
            row.appendChild(priceCell);

            // Quantity input with plus and minus buttons
            const quantityCell = document.createElement('td');
            quantityCell.className = 'align-middle';

            const quantityInputGroup = document.createElement('div');
            quantityInputGroup.className = 'input-group quantity mx-auto';

            quantityInputGroup.style.width = '100px';


            const minusButton = document.createElement('button');
            minusButton.className = 'btn btn-sm btn-primary btn-minus';
            minusButton.innerHTML = '<i class="fa fa-minus"></i>';
            minusButton.onclick = () => Minus(item.cartId);

            const quantityInput = document.createElement('input');
            quantityInput.id = `product_quantity_${item.cartId}`;
            quantityInput.type = 'text';
            quantityInput.className = 'form-control form-control-sm bg-secondary border-0 text-center';
            quantityInput.value = item.quantity;

            const plusButton = document.createElement('button');
            plusButton.className = 'btn btn-sm btn-primary btn-plus';
            plusButton.innerHTML = '<i class="fa fa-plus"></i>';
            plusButton.onclick = () => Plus(item.cartId); 

            quantityInputGroup.appendChild(minusButton);
            quantityInputGroup.appendChild(quantityInput);
            quantityInputGroup.appendChild(plusButton);
            quantityCell.appendChild(quantityInputGroup);
            row.appendChild(quantityCell);

            // Subtotal
            const subtotalCell = document.createElement('td');
            subtotalCell.className = 'align-middle';
            subtotalCell.id = `subtotalCell_${item.cartId}`;
            subtotalCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            row.appendChild(subtotalCell);

            // Remove button
            const removeCell = document.createElement('td');
            removeCell.className = 'align-middle';
            const removeButton = document.createElement('button');
            removeButton.className = 'btn btn-sm btn-danger';
            removeButton.innerHTML = '<i class="fa fa-times"></i>';
            removeButton.onclick = () => RemoveFunction(item.cartId);
            removeCell.appendChild(removeButton);
            row.appendChild(removeCell);

            // Append the row to the cart item list
            cartItemList.appendChild(row);

            // Update total price
            totalPrice += item.price * item.quantity;

            document.getElementById('totalPrice').innerHTML = totalPrice;
            document.getElementById('finalPrice').innerHTML = totalPrice + 10;
        });

        // Update total price displayed
        // totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // new element create function end from here 


    

    renderCartItems();

    console.log("============bottom")

    // Call renderCartItems to initially render the cart items
    
});






function Minus(itemId){
    const priceId = `priceCell_${itemId}`;
    const sub = `subtotalCell_${itemId}`;
    const quant = `product_quantity_${itemId}`;
    console.log(priceId, sub, quant);
    
    const unitPrice = parseFloat(document.getElementById(priceId).textContent);
    let subTotal = parseFloat(document.getElementById(sub).textContent.slice(1));
    let quantity = parseInt(document.getElementById(quant).value);
    if(quantity>=1)
        {
            subTotal -= unitPrice;

            document.getElementById(sub).textContent = `$${subTotal.toFixed(2)}`;
            document.getElementById(quant).value = quantity-1;
        } 
    if(quantity<=0) quantity = 0;
    
        

    const data = {
        quantity: quantity-1
    };    

    fetch(`http://127.0.0.1:8000/api/cart-items/${itemId}/`,{
        method: 'PATCH',

        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to update item quantity');
        }
    })
    .catch(error => {
        console.error('Error updating item quantity:', error);
    });
    

    // price calculatins
    const totalPriceElement = document.getElementById('totalPrice');
    const finalPriceElement = document.getElementById('finalPrice');
    const totalPriceValue = totalPriceElement.textContent;
    const finalPriceValue = finalPriceElement.textContent;

    const totalPrice = parseFloat(totalPriceValue);
    const finalPrice = parseFloat(finalPriceValue);
    
    totalPriceElement.innerHTML = totalPrice - unitPrice;

    finalPriceElement.innerHTML = totalPrice - unitPrice + 10;
}


function Plus(itemId) {
    const priceId = `priceCell_${itemId}`;
    const sub = `subtotalCell_${itemId}`;
    const quant = `product_quantity_${itemId}`;
    console.log(priceId, sub, quant);
    
    const unitPrice = parseFloat(document.getElementById(priceId).textContent);
    let subTotal = parseFloat(document.getElementById(sub).textContent.slice(1));
    let quantity = parseInt(document.getElementById(quant).value);
    if(quantity>0)
        {
            subTotal += unitPrice;

            document.getElementById(sub).textContent = `$${subTotal.toFixed(2)}`;
            document.getElementById(quant).value = quantity+1;
        } 


   
        // update qauntity 

        const data = {
            quantity: quantity+1
        };

        fetch(`http://127.0.0.1:8000/api/cart-items/${itemId}/`,{
            method: 'PATCH',

            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response => {
                if(!response.ok){
                    throw new Error('Failed to update item quantity');
                }
            })
            .catch(error => {
                console.error('Error updating item quantity:', error);
            });

            // update total price

                // price calculatins
        const totalPriceElement = document.getElementById('totalPrice');
        const finalPriceElement = document.getElementById('finalPrice');
        const totalPriceValue = totalPriceElement.textContent;
        const finalPriceValue = finalPriceElement.textContent;

        const totalPrice = parseFloat(totalPriceValue);
        const finalPrice = parseFloat(finalPriceValue);
        
        totalPriceElement.innerHTML = totalPrice + unitPrice;

        finalPriceElement.innerHTML = totalPrice + unitPrice + 10;
        
}


function RemoveFunction(itemId) {
    // Find the row corresponding to the item ID
    const rowToRemove = document.getElementById(`row_${itemId}`);

    // Find the corresponding list item
    const listItemToRemove = document.getElementById(`listItem_${itemId}`);

    fetch(`http://127.0.0.1:8000/api/cart-items/${itemId}/`, {
        method: 'DELETE',
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        // Item successfully deleted, you can handle the response accordingly
        })
        .catch(error => {
        console.error('Error deleting item:', error);
        });


    // Remove the row from the table
    if (rowToRemove) {
        rowToRemove.remove();
    }

    // Remove the list item from the ul
    if (listItemToRemove) {
        listItemToRemove.remove();
    }

    // Remove the item from the cartItems array
    cartItems = cartItems.filter(item => item.cartId !== itemId);
}
