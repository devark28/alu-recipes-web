# Running ALU Recipes Web Locally

This guide explains how to run the ALU Recipes Web application locally.

## Steps

1.  **Clone the Repository:**
    * Clone the repository to your local machine:
      <br/>

      ```bash
      git clone https://github.com/devark28/alu-recipes-web.git
      cd alu-recipes-web
      ```
3.  **Dependencies:**
    * This project relies on the MealDB API. Ensure your environment has internet access to fetch data from the API.
    * For security and simplicity of this app's setup, we use a javascript file as an env store holding the api key.
    * Create a file called `env-injector.js` and inside create a const variable called `API_KEY` holding your MealDB API key.
      * Example: `const API_KEY = 1;`
    * No other external dependencies are required as it's a pure HTML, CSS, and JavaScript project.

4.  **Open `index.html` in a Browser:**
    * Open the `index.html` file in your preferred web browser. You can do this by double-clicking the file or dragging and dropping it into the browser window.

5.  **Explore the Application:**
    * The application will load, displaying a random recipe.
    * Use the "Get Another Random Recipe" button or refresh the Home page to generate a new recipe.
    * Click the "10 Random Recipes" button to view a list of 10 random recipes.
    * Click on a recipe in the list to view its details.

## Notes

* The application does not require a local server setup as it's a static website.
* The application relies on the MealDB API, so an internet connection is required.
