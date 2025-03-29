document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const recipesListContainer = document.getElementById('recipesListContainer');
    const refreshListButton = document.getElementById('refreshList');
    
    // Store all fetched meals globally so we can reapply filters
    let allMeals = [];
    
    // Add sort and filter elements to the page
    addSortAndFilterControls();
    
    // Fetch 10 random recipes on page load
    fetchTenRandomRecipes();
    
    // Event listeners
    refreshListButton.addEventListener('click', fetchTenRandomRecipes);
    
    // Function to add sort and filter controls
    function addSortAndFilterControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'controls-container';
        controlsContainer.innerHTML = `
            <div class="sort-filter-container">
                <div class="sort-container">
                    <label for="sortOrder">Sort by ingredients:</label>
                    <select id="sortOrder">
                        <option value="asc">Fewest ingredients first</option>
                        <option value="desc">Most ingredients first</option>
                    </select>
                </div>
                <div class="filter-container">
                    <label for="youtubeFilter">
                        <input type="checkbox" id="youtubeFilter">
                        Only show recipes with YouTube tutorials
                    </label>
                </div>
            </div>
        `;
        
        // Insert controls before the recipes container
        recipesListContainer.parentNode.insertBefore(controlsContainer, recipesListContainer);
        
        // Add event listeners for the controls
        document.getElementById('sortOrder').addEventListener('change', function() {
            applyFiltersAndSort();
        });
        
        document.getElementById('youtubeFilter').addEventListener('change', function() {
            applyFiltersAndSort();
        });
    }
    
    // Function to apply filters and sort to the allMeals array
    function applyFiltersAndSort() {
        const sortOrder = document.getElementById('sortOrder').value;
        const youtubeFilterChecked = document.getElementById('youtubeFilter').checked;
        
        if (allMeals.length === 0) return;
        
        // Filter and sort the meals
        let filteredAndSortedMeals = [...allMeals]; // Make a copy of all meals
        
        // Apply YouTube filter if checked
        if (youtubeFilterChecked) {
            filteredAndSortedMeals = filteredAndSortedMeals.filter(meal => 
                meal.strYoutube && meal.strYoutube.trim() !== ''
            );
        }
        
        // Sort by ingredient count
        filteredAndSortedMeals.sort((a, b) => {
            const ingredientsA = countIngredients(a);
            const ingredientsB = countIngredients(b);
            
            return sortOrder === 'asc' ? ingredientsA - ingredientsB : ingredientsB - ingredientsA;
        });
        
        // Display the filtered and sorted meals
        displayRecipesList(filteredAndSortedMeals, false); // false means don't reset allMeals
    }
    
    // Function to fetch 10 random recipes
    function fetchTenRandomRecipes() {
        recipesListContainer.innerHTML = '<div class="loading">Loading...</div>';
        
        // Since the free API doesn't have a randomselection endpoint,
        // we'll fetch 10 individual random recipes one by one
        const fetchPromises = [];
        for (let i = 0; i < 10; i++) {
            fetchPromises.push(
                fetch(`https://www.themealdb.com/api/json/v1/${API_KEY}/random.php`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => data.meals[0])
            );
        }
        
        Promise.all(fetchPromises)
            .then(meals => {
                // Save all meals globally and display them
                allMeals = meals;
                displayRecipesList(meals, true); // true means reset allMeals
            })
            .catch(error => {
                recipesListContainer.innerHTML = `
                    <div class="error">
                        <p>Failed to load recipes. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
                allMeals = [];
            });
    }
    
    // Function to count ingredients in a meal
    function countIngredients(meal) {
        let count = 0;
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient && ingredient.trim() !== '') {
                count++;
            }
        }
        return count;
    }
    
    // Function to display the list of recipes
    function displayRecipesList(meals, resetAllMeals = true) {
        recipesListContainer.innerHTML = '';
        
        if (meals.length === 0) {
            recipesListContainer.innerHTML = `
                <div class="no-results">
                    <p>No recipes match your filter criteria.</p>
                    <p>Try changing your filters or click "Get New Random Recipes".</p>
                </div>
            `;
            return;
        }
        
        meals.forEach(meal => {
            const ingredientCount = countIngredients(meal);
            const hasYoutube = meal.strYoutube && meal.strYoutube.trim() !== '';
            
            const recipePreview = document.createElement('div');
            recipePreview.className = 'recipe-preview';
            
            recipePreview.innerHTML = `
                <a href="details.html?id=${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <div class="recipe-meta-info">
                        <span class="ingredient-count">${ingredientCount} ingredients</span>
                        ${hasYoutube ? '<span class="youtube-badge">YouTube Tutorial</span>' : ''}
                    </div>
                </a>
            `;
            
            recipesListContainer.appendChild(recipePreview);
        });
    }
});
