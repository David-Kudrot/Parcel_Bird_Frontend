(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });
    
})(jQuery);


(function($) {

    $(".toggle-password").click(function() {

        $(this).toggleClass("zmdi-eye zmdi-eye-off");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password" ) {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });

})(jQuery);


// Frontend JavaScript code
fetch('http://127.0.0.1:8000/api/product/')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    // Clear any existing content
    productList.innerHTML = '';
    // Loop through the products and dynamically generate HTML for each product
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'pb-1');
      productItem.innerHTML = `
    
        <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
                <img class="img-fluid w-100" src="${product.image}" alt="${product.name}">
                <div class="product-action">
                    <!-- Add action buttons if needed -->
                </div>
            </div>
            <div class="text-center py-4">
            <a href="detail.html?id=${product.id}">
                <a class="h6 text-decoration-none text-truncate" href="detail.html?id=${product.id}">${product.name}</a>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>$${product.price}</h5><h6 class="text-muted ml-2"><del>$560</del></h6>
                </div>
                <div class="d-flex align-items-center justify-content-center mb-1">
                    ${generateStars(product.rating)}
                    <small>(${product.reviews})</small>
                </div>
            </div>
            </div>
            
            `;
      productList.appendChild(productItem);
    });
  })
  .catch(error => console.error('Error fetching products:', error));

// Function to generate star icons based on rating
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const starIcons = '<small class="fa fa-star text-primary mr-1"></small>'.repeat(fullStars) +
    (halfStar ? '<small class="fa fa-star-half-alt text-primary mr-1"></small>' : '') +
    '<small class="far fa-star text-primary mr-1"></small>'.repeat(5 - Math.ceil(rating));
  return starIcons;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const ProductsId = getParameterByName('id');
const detailProduct = document.getElementById('details');

fetch(`http://127.0.0.1:8000/api/product/${ProductsId}/`)
    .then(res => res.json())    
    .then(product => {

        detailProduct.querySelector('h3').innerText = product.name;
        detailProduct.querySelector('h4').innerText = product.price;
        detailProduct.querySelector('img').src = product.image.url;
        detailProduct.querySelector('p').innerText = product.description;
      
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
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

    const userID = localStorage.getItem('user_id');

    const postData = {
       product: product_id,
       quantity: val,
       user: userID
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

    document.addEventListener('DOMContentLoaded', function() {
        fetchRestaurants();
    });
  
function fetchRestaurants() {
        fetch('http://127.0.0.1:8000/api/restaurant/res/')  
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayRestaurants(restaurants) {
        const container = document.getElementById('resturants-container');
        container.innerHTML = '';  // Clear any existing content

        restaurants.forEach(restaurant => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'pb-1');
            const ResturantID = restaurant.id;
            const anchor = document.createElement('a');
            anchor.classList.add('text-decoration-none');
            anchor.href = `shop.html?id=${ResturantID}`;  // Adjust URL as needed

            const catItem = document.createElement('div');
            catItem.classList.add('cat-item', 'd-flex', 'align-items-center', 'mb-4');

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('overflow-hidden');
            imgContainer.style.width = '100px';
            imgContainer.style.height = '100px';

            const img = document.createElement('img');
            img.classList.add('img-fluid');
            img.src = restaurant.image; 
            img.alt = restaurant.name;

            const flexDiv = document.createElement('div');
            flexDiv.classList.add('flex-fill', 'pl-3');

            const h6 = document.createElement('h6');
            h6.textContent = restaurant.name;

            const small = document.createElement('small');
            small.classList.add('text-body');
            small.textContent = `${restaurant.total_product_count} Products`;

            imgContainer.appendChild(img);
            flexDiv.appendChild(h6);
            flexDiv.appendChild(small);
            catItem.appendChild(imgContainer);
            catItem.appendChild(flexDiv);
            anchor.appendChild(catItem);
            colDiv.appendChild(anchor);
            container.appendChild(colDiv);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Fetch data from the API endpoint
        const restaurantId = getParameterByName('id');
        fetch(`http://127.0.0.1:8000/api/restaurant/res/${restaurantId}`)
            .then(response => response.json())
            .then(data => {
                const productList = document.getElementById('product-list');
                let productHTML = ''; // Accumulate product HTML content
    
                data.products.forEach(product => {
                    // Build HTML for each product
                    productHTML += `
                    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="${product.image}" alt="">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square add-to-cart" href="#" data-product-id="${product.id}">
                                    <i class="fa fa-shopping-cart"></i>
                                </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none text-truncate" href="">${product.name}</a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>$${product.price}</h5>
                            </div>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <div class="input-group quantity-control">
                                    <div class="input-group-btn">
                                        <button onclick="Minus()" class="btn btn-primary btn-minus">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input id="product_quantity" type="text" class="form-control bg-secondary border-0 text-center" value="1">
                                    <div class="input-group-btn">
                                        <button onclick="Plus()" class="btn btn-primary btn-plus">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `;
                });
    
                // Set the accumulated HTML content to the product list
                productList.innerHTML = productHTML;
    
                // Add event listener for "Add to Cart" buttons
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        event.preventDefault();
                        const productId = button.getAttribute('data-product-id');
                        addToCart(productId);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching restaurant data:', error);
            });
    });


    
    // Function to add a product to the cart
    function addToCart(productId) {
        fetch('http://127.0.0.1:8000/api/cart-item/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // If using CSRF protection
            },
            body: JSON.stringify({
                product: productId,
                quantity: 1 ,
                user: userID,
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Product added to cart:', data);
            // Optionally update the UI to reflect the added cart item
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
        });
    }
    
    // Helper function to get CSRF token if using Django's CSRF protection
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    
    
 