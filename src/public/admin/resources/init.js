var SignIn = document.getElementById('Signin');
console.log(SignIn)
var SignUp = document.getElementById('Signup');

// Initialze

// document.body.removeChild(SignIn)
// document.body.removeChild(SignUp)
// document.getElementById('Signup').style.position = 'relative';
// document.getElementById('Signin').style.position = 'flex';
// document.getElementById('Signup').hidden = true;
//---------

document.addEventListener('DOMContentLoaded', function()
{
    document.getElementById("Sign-in-btn").addEventListener('click', function(){
        // if (document.body)
        document.body.appendChild(SignIn)
    })
    document.getElementById("Sign-up-btn").addEventListener('click', function(){
        document.body.appendChild(SignUp)
    })
})

function SinupPopup() {
    document.body.appendChild(SignUp);
    console.log("SignupPopup")
}

function SininPopup() {
    document.body.appendChild(SignIn);
    console.log("SigninPopup")
}