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