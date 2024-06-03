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


// Frontend JavaScript code from API
fetch('https://parcel-bird-backend-ykce.onrender.com/api/product/')
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
                        <h5>$${product.price}</h5><h6 class="text-muted ml-2"></h6>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mb-1">
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small>(99)</small>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mt-2">
                    <div class="btn-group">
                        <a class="btn btn-outline-dark add-to-cart" href="" onclick="addToCart()" data-product-id="${product.id}">
                            Add to cart <i class="fa fa-shopping-cart"></i>
                        </a>
                        <a href="detail.html?id=${product.id}" class="btn btn-info view-details" data-product-id="${product.id}">View Details</a>
                    </div>
                </div>
                </a>
            </div>
        </div>
            
        `;
      productList.appendChild(productItem);
    });
  })
  .catch(error => console.error('Error fetching products:', error));



//start show product on the details page

fetch('https://parcel-bird-backend-ykce.onrender.com/api/product/')
  .then(response => response.json())
  .then(products => {
    const pList = document.getElementById('product_details_carousel');
    // Clear any existing content
    pList.innerHTML = '';
    // Loop through the products and dynamically generate HTML for each product
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item', 'bg-light', 'col-md-3');
      productItem.innerHTML = `
        <div class="product-img position-relative overflow-hidden">
          <img class="img-fluid w-100 caro-image" src="${product.image}" alt="">
        </div>
        <div class="text-center py-4">
          <a class="h6 text-decoration-none text-truncate" href="detail.html?id=${product.id}">${product.name}</a>
          <div class="d-flex align-items-center justify-content-center mt-2">
            <h5>$${product.price}</h5><h6 class="text-muted ml-2"></h6>
          </div>
          <div class="d-flex align-items-center justify-content-center mb-1">
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small>(99)</small>
          </div>
          <div class="d-flex align-items-center justify-content-center mt-2">
            <div class="btn-group">
              <a class="btn btn-outline-dark add-to-cart" href="#" onclick="addToCart(${product.id})" data-product-id="${product.id}">
                Add to cart <i class="fa fa-shopping-cart"></i>
              </a>
              <a href="detail.html?id=${product.id}" class="btn btn-info view-details" data-product-id="${product.id}">View Details</a>
            </div>
          </div>
        </div>
      `;
      pList.appendChild(productItem);
    });

    // Initialize Owl Carousel after appending products
    $('#product_details_carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  })
  .catch(error => console.error('Error fetching products:', error));


//end show product on the details page











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

fetch(`https://parcel-bird-backend-ykce.onrender.com/api/products/${ProductsId}/`)
    .then(res => res.json())    
    .then(product => {

        detailProduct.querySelector('h3').innerText = product.name;
        detailProduct.querySelector('h4').innerText = product.price;
        detailProduct.querySelector('img').src = product.image;
        detailProduct.querySelector('p').innerText = product.description;
        
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
    });
    

    function Minus(productId) {
        const inputElement = document.getElementById(`product_quantity_${productId}`);
        let val = parseInt(inputElement.value, 10);
        if (!isNaN(val)) {
            val -= 1; 
            if(val<=0) val=0;
            inputElement.value = val; 
        } else {
            console.error("The value is not a number");
        }
    }
    
    function Plus(productId) {
        const inputElement = document.getElementById(`product_quantity_${productId}`);
        let val = parseInt(inputElement.value, 10);
        if (!isNaN(val)) {
            val += 1; 
            inputElement.value = val; 
        } else {
            console.error("The value is not a number");
        }
    }
    
    

    document.addEventListener('DOMContentLoaded', function() {
        fetchRestaurants();
    });


  
function fetchRestaurants() {
        fetch('http://127.0.0.1:8000/api/restaurant/res/')  
            .then(response => response.json())
            .then(data => {
                displayRestaurants(data);

                console.log(data)
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
            small.textContent = restaurant.products.length;
     

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



    
    // Function to add a product to the cart

    document.addEventListener('DOMContentLoaded', () => {
        const restaurantId = getParameterByName('id');
        const apiUrl = 'https://parcel-bird-backend-ykce.onrender.com/api/product/';
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
            //    const products =  filterProductsByRestaurant(data, restaurantId);
                // changed by dk
               const products =  filterProductsByRestaurant(data);
               displayProducts(products);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
    
    // function filterProductsByRestaurant(products, restaurantId) {
    //     return products.filter(product => {
    //         console.log(product.restaurant);
    //         return product.restaurant === parseInt(restaurantId)
              
    //     });
    // }

    // changed by dk
    function filterProductsByRestaurant(products) {
        return products;
    }
    
    
    function displayProducts(products) {
        // console.log(products)

        const productList = document.getElementById('resturatnt-product-list');
        let productHTML = '';
    
        products.forEach(product => {
            productHTML += `
            <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
                <img class="img-fluid w-100" src="${product.image}" alt="">
                <div class="product-action">
                </div>
            </div>
            <div class="text-center py-4">
                <a class="h6 text-decoration-none text-truncate" href="#">${product.name}</a>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>$${product.price}</h5>
                </div>
                <div class="d-flex align-items-center justify-content-center mb-1">
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small>(99)</small>
                </div>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <div class="btn-group">
                        <a class="btn btn-outline-dark add-to-cart" href="" onclick="addToCart()" data-product-id="${product.id}">
                            Add to cart <i class="fa fa-shopping-cart"></i>
                        </a>
                        <a href="detail.html?id=${product.id}" class="btn btn-info view-details" data-product-id="${product.id}">View Details</a>
                    </div>
                </div>
            </div>
                
        </div>
    </div>`;

        
        });
    
        productList.innerHTML = productHTML;
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
                    addToCartButtons.forEach(button => {
                        button.addEventListener('click', event => {
                            event.preventDefault();
                            Window.location.href = `checkout.html/?${userID}`;
                            const productId = button.getAttribute('data-product-id');
                            const inputElement = document.getElementById(`product_quantity_${productId}`);
                            let val = parseInt(inputElement.value);
                            console.log(productId);
                            console.log(val);
                            addcart(productId,val);
                        });

                    });
 
             }


    // cart         
    const csrftoken = getCookie('csrftoken');
    const userID = localStorage.getItem('user');// karon localestorage a user die sev korsi
    // function addcart(productId,quantity){
    //     const postData = {
    //         "product": productId,
    //         "quantity": quantity,
    //         "user": userID
    //      };
    //     const postUrl = 'http://127.0.0.1:8000/api/cart-item/';
    //     const options = {
    //                 method: 'POST', 
    //                 headers: {
    //                     'Content-Type': 'application/json' ,
    //                     'X-CSRFToken': csrftoken
    //                 },
    //                 body: JSON.stringify(postData)
    //             };
    //             fetch(postUrl, options)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         window.location.href = 'cart.html';
    //         console.log('Success:', data);
    //         // You can add code here to update the UI or handle the response data
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // }
  

 
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
    
    
    
    document.addEventListener('DOMContentLoaded', function () {
        // Retrieve the value from local storage
        var cartLength = localStorage.getItem('total-cart');

        // If cartLength is not null or undefined, update the total-cart badge
        if (cartLength !== null && cartLength !== undefined) {
            document.getElementById('total-cart').textContent = cartLength;
        }
    });

    
    function addToCart() {
        // Get the product details
        const productID = getParameterByName('id');
        const productQuantity = parseInt(document.getElementById(`product_quantity`).value);
        console.log(productQuantity);
        // Create an object representing the product
        const postData = {
            "product": productID,
            "quantity": productQuantity,
            "user": userID
        };
        const postUrl = 'https://parcel-bird-backend-ykce.onrender.com/api/cart-item/';
        const options = {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json' ,
                        'X-CSRFToken': csrftoken
                    },
                    body: JSON.stringify(postData)
                };
                fetch(postUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = 'cart.html';
            console.log('Success:', data);
            // You can add code here to update the UI or handle the response data
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }
    

    