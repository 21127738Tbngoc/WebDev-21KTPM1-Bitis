// Open menu feature

let isOpenMenu = false;


// const navbarContainer = document.querySelector('.navbar-container')

function toggleMenu()
{
    const menu = document.querySelector('.navbar-menu')
    const openIconMenu = document.querySelector('.navbar .menu-open-btn img');

    if(isOpenMenu === false)
    {
        openIconMenu.src = '/imgs/navbar/close-icon.svg'
        menu.classList.add('open-menu');
        isOpenMenu = true;
    }
    else {
        openIconMenu.src = '/imgs/navbar/menu-icon.svg'
        menu.classList.remove('open-menu');
        isOpenMenu = false
    }
}

openIconMenu.addEventListener('click',toggleMenu);

// Open cart modal feature
const openIconCartModal = document.querySelector('.navbar .cart-modal-open-btn img');
const closeIconCartModal = document.querySelector('.cart-close-btn img');

const cartModal = document.querySelector('.navbar-cart')

function openCartModal() {
    cartModal.classList.add('open-cart-modal');
}

function closeCartModal() {
    cartModal.classList.remove('open-cart-modal');
}

openIconCartModal.addEventListener('click',openCartModal);
closeIconCartModal.addEventListener('click',closeCartModal);

navbarContainer.addEventListener('click',function(event){
    event.stopPropagation()
})

// Account dropdown
// JavaScript to toggle dropdown content
document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownContent = document.getElementById("dropdownContent");
  
    dropdownButton.addEventListener("click", function() {
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });
  
    // Handling clicks outside the dropdown to close it
    document.addEventListener("click", function(event) {
      if (!event.target.matches('#dropdownButton')) {
        dropdownContent.style.display = "none";
      }
    });
  
    // Handling sign-in and sign-up click events
    const signIn = document.getElementById("signIn");
    const signUp = document.getElementById("signUp");
  
    signIn.addEventListener("click", function() {
      // Handle sign-in action
      console.log("Sign In clicked");
      dropdownContent.style.display = "none";
    });
  
    signUp.addEventListener("click", function() {
      // Handle sign-up action
      console.log("Sign Up clicked");
      dropdownContent.style.display = "none";
    });
});

