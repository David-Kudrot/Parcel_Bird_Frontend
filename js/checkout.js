document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('placeOrderButton').addEventListener('click', PlaceOrder);
});

function PlaceOrder() {
    console.log("yes");
    
    // Gather the input values
    const Email = document.getElementById('email')?.value;
    const apartmentaddress = document.getElementById('apartment_address')?.value;
    const name = document.getElementById('name')?.value;
    const street_address = document.getElementById('street_address')?.value;
    const contact = document.getElementById('contact')?.value;
    const city = document.getElementById('city')?.value;
    const state = document.getElementById('state')?.value;
    const country = document.getElementById('country')?.value;
    const zip = document.getElementById('zip')?.value;

    // Log values to identify any null elements
    console.log({ Email, apartmentaddress, name, street_address, contact, city, state, country, zip });

    if (!Email || !apartmentaddress || !name || !street_address || !contact || !city || !state || !country || !zip) {
        alert('Please fill in all required fields.');
        return;
    }

    // Construct the payload object
    const payload = {
        email: Email,
        apartment_address: apartmentaddress,
        name: name,
        street_address: street_address,
        contact: contact,
        city: city,
        state: state,
        country: country,
        zip: zip
    };

    // Use fetch to send a POST request
    fetch('http://127.0.0.1:8000/api/customeraddresses/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data
        console.log('Success:', data);
        alert('Order placed successfully!');
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
        alert('There was a problem with your order: ' + error.message);
    });
}
