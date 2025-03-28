document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const recipesListContainer = document.getElementById('recipesListContainer');
    const refreshListButton = document.getElementById('refreshList');
    
    // Fetch 10 random recipes on page load
    fetchTenRandomRecipes();
    
    // Event listeners
    refreshListButton.addEventListener('click', fetchTenRandomRecipes);
    
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
                displayRecipesList(meals);
            })
            .catch(error => {
                recipesListContainer.innerHTML = `
                    <div class="error">
                        <p>Failed to load recipes. Please try again later.</p>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            });
    }
    
    // Function to display the list of recipes
    function displayRecipesList(meals) {
        recipesListContainer.innerHTML = '';
        
        meals.forEach(meal => {
            const recipePreview = document.createElement('div');
            recipePreview.className = 'recipe-preview';
            recipePreview.innerHTML = `
                <a href="details.html?id=${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                </a>
            `;
            
            recipesListContainer.appendChild(recipePreview);
        });
    }
});
