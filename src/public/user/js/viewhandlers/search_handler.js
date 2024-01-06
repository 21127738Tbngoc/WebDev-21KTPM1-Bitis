function displayResults(results) {
    if (results.length > 0) {
        searchResults.innerHTML = ''; // Clear previous results
        results.forEach(result => {
            const div = document.createElement('div');
            div.textContent = result;
            div.classList.add('result-item');
            searchResults.appendChild(div);
        });
        searchResults.style.display = 'block';
    } else {
        searchResults.style.display = 'none';
    }
}