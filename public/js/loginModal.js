// Open the login modal
document.getElementById('loginBtn').addEventListener('click', openModal);

// Close the login modal
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Open the login modal
function openModal() {
    document.getElementById('loginModal').style.display = 'block';
}
