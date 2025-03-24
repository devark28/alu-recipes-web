# Alu Recipes Web - Random Recipe Generator

This project is a web application that generates random recipes using the MealDB API. It provides a user-friendly interface to discover new meal ideas, view recipe details, and explore a selection of random recipes.

## Features

-   **Random Recipe on Load:** The home page (`index.html`) displays a random recipe when it's loaded.
-   **Get Another Random Recipe:** A button on the home page allows users to fetch and display a new random recipe.
-   **10 Random Recipes:** A button on the home page navigates users to the `recipes.html` page, which displays 10 random recipes.
-   **Recipe Details:** Each recipe on the 10 random recipes page links to a detailed view (`details.html`).
-   **Comprehensive Recipe Information:** The details page includes:
    -   Recipe title and image
    -   Ingredients with corresponding measurements and images
    -   Cooking instructions
    -   Recipe category, area, and tags
    -   Link to a YouTube tutorial (if available)
-   **Responsive Design:** The application is designed to be responsive and work well on various screen sizes.
-   **Error Handling:** The application handles API errors gracefully and displays user-friendly messages.

## Technologies Used

-   HTML
-   CSS
-   Vanilla JavaScript
-   MealDB API (https://www.themealdb.com/api.php)

## API Usage

This application uses the MealDB API to fetch recipe data. The following endpoints are used:

-   `https://www.themealdb.com/api/json/v1/1/random.php`: To fetch a single random recipe.
-   `https://www.themealdb.com/api/json/v1/1/lookup.php?i={recipe_id}`: To fetch detailed recipe information.
-   Since the free MealDB API does not provide a true random selection endpoint, 10 calls to `https://www.themealdb.com/api/json/v1/1/random.php` are made to generate 10 random recipes.

## Directory Structure

```
alu-recipes-web/
├── details.html
├── details.js
├── index.html
├── index.js
├── recipes.html
├── recipes.js
└── styles.css
```

-   `index.html`: Home page displaying a random recipe.
-   `index.js`: JavaScript logic for the home page.
-   `recipes.html`: Page displaying 10 random recipes.
-   `recipes.js`: JavaScript logic for the 10 random recipes page.
-   `details.html`: Page displaying detailed recipe information.
-   `details.js`: JavaScript logic for the recipe details page.
-   `styles.css`: Shared CSS styles for all pages.

## Setup and Usage

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/devark28/alu-recipes-web.git
    cd alu-recipes-web
    ```

2.  **Open `index.html`:**

    Open `index.html` in your web browser.

3.  **Explore Recipes:**

    -   Use the "Get Another Random Recipe" button to generate new recipes.
    -   Click the "10 Random Recipes" button to view a list of 10 random recipes.
    -   Click on a recipe in the list to view its details.

## Credits

-   MealDB API: For providing the recipe data.
-   devark28: For developing and deploying the application.

## Demo Video

[Link to your demo video (e.g., YouTube, Vimeo)]

## Deployment

- managed to redirect the a sub domain of my .tech domain to github pages.

## Challenges and Solutions

- Scrapping the web for a useful API that matches the rubrics criteria
- testing the API to see if it works fine, some APIs didn't work
- dealing with images with this api like displaying and fetching them.

## Future Improvements

-   Implement user authentication to save favorite recipes.
-   Add search functionality to find recipes by ingredients or keywords.
-   Improve the UI/UX with more interactive elements.
-   Add more advanced filtering options.
-   Add unit tests.
-   Add a recipe rating system.
-   But this is just a school assignment! 😂

## License

- [WTFPL](https://en.wikipedia.org/wiki/WTFPL)
