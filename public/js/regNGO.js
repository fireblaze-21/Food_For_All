function validation() {   
    const name = document.getElementById('name').value;
    const address= document.getElementById('address').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const regid = document.getElementById('regID').value;
    const password1= document.getElementById('password').value;
    const password2= document.getElementById('password_again').value;
    let isValid = true;
    
    if (name.trim() === '') {
        document.querySelector('#name + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#name + .msg').style.display = 'none';
    }

    if (address.trim() === '') {
        document.querySelector('#address + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#address + .msg').style.display = 'none';
    }
    if (!isValidEmail(email)) {
        document.querySelector('#email + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#email+ .msg').style.display = 'none';
    }
  
    if (!validateContactNumber(number)) {
        document.querySelector('#number + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#number + .msg').style.display = 'none';
    }
    if (!validateRegistrationID(regid)) {
        document.querySelector('#regID + .msg').style.display = 'block';
        isValid = false;
    }
    else{
        document.querySelector('#regID + .msg').style.display = 'none';
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
    if((password1.length >= 8 ))
    { 
     if(password1!==password2)
     {
        
        document.querySelector('#password_again + .msg').style.display = 'block';
        isValid = false;
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
function validateContactNumber(contactNumber) {
    // Regular expression pattern for a valid contact number
    var regex = /^\d{10}$/;
  
    // Check if the contact number matches the pattern
    if (regex.test(contactNumber)) {
      return true; // Valid contact number
    } else {
      return false; // Invalid contact number
    }
  }
  function validateRegistrationID(registrationID) {
    // Regular expression pattern for a valid registration ID
    var regex = /^WB\d{10}$/;
  
    // Check if the registration ID matches the pattern
    if (regex.test(registrationID)) {
      return true; // Valid registration ID
    } else {
      return false; // Invalid registration ID
    }
  }
  
  const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');


selectImage.addEventListener('click', function () {
	inputFile.click();
})


inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 1000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 1MB");
	}
})