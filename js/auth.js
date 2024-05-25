// const get_value = (id) => {
//     const value = document.getElementById(id).value;
//     return value;
// }

// const handleRegistration = (event)=>{
//     event.preventDefault();

//     const first_name = get_value("first_name");
//     const last_name = get_value("last_name");
//     const email = get_value("email");
//     const image = get_value("profile_image");
//     const role = get_value("interest");
//     const password = get_value("password");
//     const confirm_password = get_value("re_password");
//     const info = {first_name,last_name,email,image,role ,password,confirm_password};
    
//     if (password === confirm_password){
//         console.log(info)
        
//         if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
//             fetch("http://127.0.0.1:8000/api/user/register/",
//             {
//             method: "POST",
//             headers : {"Content-type":"application/json"},
//             body :JSON.stringify(info)
        
//         })
//         .then(res=>res.json())
//         .then((data)=> console.log(data))
//         window.location.href = "login.html";
           
//         }
//         else{
//             document.getElementById("error").innerText = "password contains minimum eight characters, at least one letter,one number and one special character";
//         }
//     }
//     else{
//         document.getElementById("error").innerText = "Password and confirm password do not match";
//         alert("Password and confirm password do not match")
//     }
// }



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', handleRegistration);
});

async function handleRegistration(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    
    const firstName = form.first_name.value;
    const lastName = form.last_name.value;
    const email = form.email.value;
    const role = form.role.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const agreeTerm = form['agree-term'].checked;

    if (!agreeTerm) {
        alert('You must agree to the terms of service.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    try {
        const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
            method: 'POST',
            body: formData,
        });

        const contentType = response.headers.get('content-type');

        if (response.ok) {
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('Registration successful:', result);
                window.location.href = "login.html";
            } else {
                console.error('Unexpected response format:', response);
                alert('Registration successful, but unexpected response format.');
            }
        } else {
            if (contentType && contentType.includes('application/json')) {
                const error = await response.json();
                console.error('Registration failed:', error);
                alert('Registration failed: ' + (error.message || 'Unknown error'));
            } else {
                const errorText = await response.text();
                console.error('Registration failed with non-JSON response:', errorText);
                alert('Registration failed: ' + errorText);
            }
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error: ' + error.message);
    }
}







document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', handleLogin);
});

async function handleLogin(event) {
    event.preventDefault();// Prevent the default form submission

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const contentType = response.headers.get('content-type');

        if (response.ok) {
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('Login successful:', result);
                alert('Login successful!');
                window.location.href = "index.html"
                // Handle successful login (e.g., redirect to dashboard)
            } else {
                console.error('Unexpected response format:', response);
                alert('Login successful, but unexpected response format.');
            }
        } else {
            if (contentType && contentType.includes('application/json')) {
                const error = await response.json();
                console.error('Login failed:', error);
                alert('Login failed: ' + (error.message || 'Unknown error'));
            } else {
                const errorText = await response.text();
                console.error('Login failed with non-JSON response:', errorText);
                alert('Login failed: ' + errorText);
            }
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error: ' + error.message);
    }
}


