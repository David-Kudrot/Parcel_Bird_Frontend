# ParcelBird Food Delivery App

Welcome to ParcelBird, your go-to food delivery app! This repository contains the code for the ParcelBird app, which allows users to order food from their favorite restaurants and have it delivered to their doorstep.

## Features

### User Management
- **User Registration**: New users can register an account via a registration link.
- **User Login**: Existing users can log in using their credentials.
  
### Restaurant Browsing and Ordering
- **Browse Restaurants**: Users can browse through a list of available restaurants.
- **Restaurant Details**: Click on a restaurant to view its menu and other details.
- **Add to Cart**: Users can add items to their cart from the restaurant's menu.

### Cart and Order Management
- **View Cart**: Users can view the items added to their cart.
- **Edit Cart**: Users can modify the quantity of items in their cart or remove items.
- **Place Order**: Users can proceed to purchase the items in their cart.

### Payment System
- **Payment Integration**: Secure payment system integrated for processing orders.

## Getting Started


### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/parcelbird.git
    ```
2. **Navigate to the project directory**
    ```bash
    cd parcelbird
    ```
3. **Install dependencies**
    ```bash
    npm install
    ```
4. **Set up environment variables**
    - Create a `.env` file in the root directory
    - Add the following variables to the `.env` file:
      ```
      DB_CONNECTION_STRING=your_mongodb_connection_string
      PORT=your_preferred_port
      SECRET_KEY=your_secret_key
      ```
5. **Start the server**
    ```bash
    npm start
    ```

### Running the App

- **Frontend**: Open your browser and go to `http://localhost:your_preferred_port`
- **Backend**: The server will be running on `http://localhost:your_preferred_port/api`

## Project Structure


## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

Thank you to all our users and contributors for making ParcelBird possible!

---

Enjoy using ParcelBird! If you have any questions or feedback, please don't hesitate to reach out.

Happy ordering!

---

