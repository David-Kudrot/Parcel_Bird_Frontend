const get_value = (id) => {
    const value = document.getElementById(id).value;
    return value;
}

const handleRegistration = (event)=>{
    event.preventDefault();

    const first_name = get_value("first_name");
    const last_name = get_value("last_name");
    const email = get_value("email");
    const image = get_value("profile_image");
    const role = get_value("interest");
    const password = get_value("password");
    const confirm_password = get_value("re_password");
    const info = {first_name,last_name,email,image,role ,password,confirm_password};
    
    if (password === confirm_password){
        console.log(info)
        
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
            fetch("http://127.0.0.1:8000/api/user/register/",
            {
            method: "POST",
            headers : {"Content-type":"application/json"},
            body :JSON.stringify(info)
        
        })
        .then(res=>res.json())
        .then((data)=> console.log(data))
        window.location.href = "login.html";
           
        }
        else{
            document.getElementById("error").innerText = "password contains minimum eight characters, at least one letter,one number and one special character";
        }
    }
    else{
        document.getElementById("error").innerText = "Password and confirm password do not match";
        alert("Password and confirm password do not match")
    }
}


const handleLogin = (event)=>{
    console.log("hello");
    event.preventDefault();
    
    const email = get_value("email");
    const password = get_value("password");
    console.log(email, password);
    if((email && password)){
        fetch("http://127.0.0.1:8000/api/user/login/",{
            method: "POST",
            headers : {"content-type":"application/json"},
            body :JSON.stringify({email,password})
        })
        .then(res=>res.json())
        .then((data)=> {console.log(data);
            if(data.token && data.user_id){
                localStorage.setItem("token",data.token);
                localStorage.setItem("user_id",data.user_id);
                window.location.href = "index.html";

            }
    });
    }
    else{
        console.log("User not found");
    }
   
   
}


