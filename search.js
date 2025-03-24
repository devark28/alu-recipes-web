document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const searchResults = document.getElementById('searchResults');
    const searchQueryDisplay = document.getElementById('searchQuery');
    const noResultsDisplay = document.getElementById('noResults');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    // If there's a search query, perform the search
    if (searchQuery && searchQuery.trim() !== '') {
        // Set the input value to the search query
        searchInput.value = searchQuery;
        
        // Display the search query
        searchQueryDisplay.innerHTML = `<h2>Search results for: "${searchQuery}"</h2>`;
        
        // Perform the search
        searchRecipes(searchQuery);
    } else {
        // If no search query, show a message
        searchResults.innerHTML = '';
        searchQueryDisplay.innerHTML = '<h2>Please enter a search term</h2>';
    }
    
    // Function to search for recipes
    function searchRecipes(query) {
        searchResults.innerHTML = '<div class="loading">Loading...</div>';
        noResultsDisplay.style.display = 'none';
        
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.meals && data.meals.length > 0) {
                    displaySearchResults(data.meals);
                } else {
                    // No results found
                    searchResults.innerHTML = '';
                    noResultsDisplay.style.display = 'block';
                }
            })
            .catch(error => {
                searchResults.innerHTML = `
                    <div class="error">
                        <p>Failed to load search results. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            });
    }
    
    // Function to display search results
    function displaySearchResults(meals) {
        searchResults.innerHTML = '';
        
        meals.forEach(meal => {
            const recipePreview = document.createElement('div');
            recipePreview.className = 'recipe-preview';
            recipePreview.innerHTML = `
                <a href="details.html?id=${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                </a>
            `;
            
            searchResults.appendChild(recipePreview);
        });
    }
});
