document.addEventListener("DOMContentLoaded", () => {
    fetch("http://127.0.0.1:8000/api/product/")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const productList = document.getElementById("product-list");

            data.forEach(product => {
                // Create product item
                const shortDescription = product.description.split(' ').slice(0, 10).join(' ') + '...';

                console.log(product.image)

                const productItem = document.createElement("div");
                productItem.className = "col-md-6 col-lg-4 col-xl-3";
                productItem.innerHTML = `
                    <div class="rounded position-relative fruite-item">
                        <div class="fruite-img">
                            <img src="${product.image}" class="img-fluid w-100 rounded-top" alt="${product.name}">
                        </div>
                        <div class="text-white bg-danger px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">Category</div>
                        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>${product.name}</h4>
                            <p>${shortDescription}</p>
                            <div class="d-flex justify-content-between flex-lg-wrap">
                                <p class="text-dark fs-5 fw-bold mb-0">${product.price} Tk</p>
                                <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary">
                                    <i class="fa fa-shopping-bag me-2 text-primary"></i>Add to cart
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});
