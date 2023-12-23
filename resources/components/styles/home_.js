document.addEventListener('DOMContentLoaded', function() {
    const livingRoomSection = document.getElementById('living-room');
    const livingRoomImage = livingRoomSection.querySelector('.category-img');

    livingRoomSection.addEventListener('click', function() {
        livingRoomImage.style.opacity = '1';
    });

    
});

document.addEventListener('DOMContentLoaded', function() {
    const bedRoomSection = document.getElementById('bed-room');
    const bedRoomImage = bedRoomSection.querySelector('.category-img');

    bedRoomSection.addEventListener('click', function() {
        bedRoomImage.style.opacity = '1';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const diningRoomSection = document.getElementById('dining-room');
    const diningRoomImage = diningRoomSection.querySelector('.category-img');

    diningRoomSection.addEventListener('click', function() {
        diningRoomImage.style.opacity = '1';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const bathRoomSection = document.getElementById('bath-room');
    const bathRoomImage = bathRoomSection.querySelector('.category-img');

    bathRoomSection.addEventListener('click', function() {
        bathRoomImage.style.opacity = '1';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const livingRoomSection = document.getElementById('living-room');
    const livingRoomImage = livingRoomSection.querySelector('.category-img');

    livingRoomSection.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevents the click event from propagating to the document
        livingRoomImage.style.opacity = '1';
    });

    const bedRoomSection = document.getElementById('bed-room');
    const bedRoomImage = bedRoomSection.querySelector('.category-img');

    bedRoomSection.addEventListener('click', function(event) {
        event.stopPropagation();
        bedRoomImage.style.opacity = '1';
    });

    const diningRoomSection = document.getElementById('dining-room');
    const diningRoomImage = diningRoomSection.querySelector('.category-img');

    diningRoomSection.addEventListener('click', function(event) {
        event.stopPropagation();
        diningRoomImage.style.opacity = '1';
    });

    const bathRoomSection = document.getElementById('bath-room');
    const bathRoomImage = bathRoomSection.querySelector('.category-img');

    bathRoomSection.addEventListener('click', function(event) {
        event.stopPropagation();
        bathRoomImage.style.opacity = '1';
    });

    // Hide images when clicking outside the sections
    document.addEventListener('click', function(event) {
        hideAllImages();
    });

    // Hides all images except the clicked one
    function hideAllImages() {
        const allImages = document.querySelectorAll('.category-img');
        allImages.forEach(function(image) {
            image.style.opacity = '0';
        });
    }
});
