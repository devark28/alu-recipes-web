document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const recipeContainer = document.getElementById('recipeContainer');
    const refreshButton = document.getElementById('refreshRandom');
    const tenRandomButton = document.getElementById('tenRandom');
    
    // Fetch a random recipe on page load
    fetchRandomRecipe();
    
    // Event listeners
    refreshButton.addEventListener('click', fetchRandomRecipe);
    tenRandomButton.addEventListener('click', function() {
        window.location.href = 'recipes.html';
    });
    
    // Function to fetch a random recipe
    function fetchRandomRecipe() {
        recipeContainer.innerHTML = '<div class="loading">Loading...</div>';
        
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayRandomRecipe(data.meals[0]);
            })
            .catch(error => {
                recipeContainer.innerHTML = `
                    <div class="error">
                        <p>Failed to load recipe. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            });
    }
    
    // Function to display the random recipe
    function displayRandomRecipe(meal) {
        recipeContainer.innerHTML = `
            <div class="recipe">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
                <div class="recipe-category">${meal.strCategory}</div>
                <p>${meal.strArea} Cuisine</p>
                <div class="button-container" style="margin-top: 20px;">
                    <a href="details.html?id=${meal.idMeal}" class="btn">View Full Recipe</a>
                </div>
            </div>
        `;
    }
});
