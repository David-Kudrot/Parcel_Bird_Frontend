document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/api/cart-item/')
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData); // Log the entire response

            const tableBody = document.querySelector('tbody.align-middle');
            tableBody.innerHTML = ''; 

            // for each start from here 
           responseData.forEach(element => {
              
            const id = 1;
            console.log("id ===========", id);
            // fetch for single data 
      
            console.log("id ===========", id);
                // fetch for single data 
            fetch(`http://127.0.0.1:8000/api/products/${id}/`)
                .then(response => response.json())
                .then(data => {
                    console.log("data=======", data)
                })
                .catch(error => console.error('Error fetching single product data:', error));

             // fetch for single data 


           });

        //    for each ended from here 

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
