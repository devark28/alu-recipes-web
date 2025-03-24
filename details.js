document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const recipeContainer = document.getElementById('recipeContainer');
    
    // Get recipe ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    
    // Fetch recipe details if ID exists
    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        recipeContainer.innerHTML = `
            <div class="error">
                <p>No recipe ID provided. Please select a recipe first.</p>
                <div class="button-container">
                    <a href="index.html" class="btn">Back to Home</a>
                </div>
            </div>
        `;
    }
    
    // Function to fetch recipe details by ID
    function fetchRecipeDetails(id) {
        recipeContainer.innerHTML = '<div class="loading">Loading...</div>';
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.meals && data.meals.length > 0) {
                    displayRecipeDetails(data.meals[0]);
                } else {
                    throw new Error('Recipe not found');
                }
            })
            .catch(error => {
                recipeContainer.innerHTML = `
                    <div class="error">
                        <p>Failed to load recipe details. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            });
    }
    
    // Function to display recipe details
    function displayRecipeDetails(meal) {
        // Gather ingredients and measurements
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push({
                    name: ingredient,
                    measure: measure
                });
            }
        }
        
        // Format the instructions with proper paragraphs
        const instructions = meal.strInstructions
            .split('\r\n')
            .filter(step => step.trim() !== '')
            .map(step => `<p>${step}</p>`)
            .join('');
        
        // Build the HTML
        recipeContainer.innerHTML = `
            <div class="recipe-header">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="recipe-meta">
                    <span>${meal.strCategory}</span>
                    <span>${meal.strArea} Cuisine</span>
                    ${meal.strTags ? meal.strTags.split(',').map(tag => `<span>${tag.trim()}</span>`).join('') : ''}
                </div>
            </div>
            
            <div class="recipe-content">
                <div class="ingredients-list">
                    <h3>Ingredients</h3>
                    <ul>
                        ${ingredients.map(item => `
                            <li>
                                <img src="https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.name)}-small.png" 
                                    alt="${item.name}" class="ingredient-img">
                                <span>${item.measure} ${item.name}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="instructions">
                    <h3>Instructions</h3>
                    ${instructions}
                </div>
            </div>
            
            ${meal.strYoutube ? `
                <div class="video-container">
                    <h3>Video Tutorial</h3>
                    <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">
                        Watch on YouTube
                    </a>
                </div>
            ` : ''}
        `;
    }
});
