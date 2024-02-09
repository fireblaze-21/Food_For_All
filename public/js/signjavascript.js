// alert("vnb");
function validation() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password1= document.getElementById('password').value;
    const password2= document.getElementById('password_again').value;
    let isValid = true;
    
    if (firstName.trim() === '') {
        document.querySelector('#first-name + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#first-name + .msg').style.display = 'none';
    }

    if (lastName.trim() === '') {
        document.querySelector('#last-name + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#last-name  + .msg').style.display = 'none';
    }
    if (!isValidEmail(email)) {
        document.querySelector('#email + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#email+ .msg').style.display = 'none';
    }
    if (password1.trim() === ''||(password1.length < 8 )) {
        document.querySelector('#password + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#password + .msg').style.display = 'none';
    }
    // if (password2.trim() === ''||(password2.length < 8 ) ) {
       
    //     document.querySelector('#password_again + .msg').style.display = 'block';
    //     isValid = false;
    // }
    // else{
    //     document.querySelector('#password_again + .msg').style.display = 'none';
    // }
    if((password1.length >= 8 )&&(password2.length >= 8 ))
    { 
     if(password1!==password2)
     {
        
        document.querySelector('#password_again + .msg').style.display = 'block';
        isValid = false;
        alert("vnb");
     }
     else{
        document.querySelector('#password_again + .msg').style.display = 'none';
     }
    }
    // If the form is valid, submit the data
    if (isValid) {
        // Perform the form submission or any other desired action
        console.log('Form submitted!');
    }
    return isValid;
}

function isValidEmail(email) {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}