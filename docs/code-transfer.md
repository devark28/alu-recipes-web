# Code Transfer Guide for ALU Recipes Web

This guide outlines how to transfer the ALU Recipes Web application code to your server.

## Transferring the Code

1.  **Clone the Repository:**
    * Use Git to clone the repository to your local machine:

    ```bash
    git clone https://github.com/devark28/alu-recipes-web.git
    cd alu-recipes-web
    ```

2.  **Copy Files:**
    * Alternatively, you can download the repository as a ZIP file from GitHub and extract it to your desired location.

3.  **Directory Structure:**
    * Ensure the following directory structure is maintained:

    ```
    alu-recipes-web/
    ├── details.html
    ├── details.js
    ├── docs
    │   ├── cicd-setup-guide.md
    │   ├── code-transfer.md
    │   ├── nginx-setup-guide.md
    │   ├── run-me-local.md
    │   └── run-me-webserver.md
    ├── index.html
    ├── index.js
    ├── py_cicd_script.py
    ├── README.md
    ├── recipes.html
    ├── recipes.js
    ├── search.html
    ├── search.js
    └── styles.css
    ```

4.  **Dependencies:**
    * This project relies on the MealDB API. Ensure your environment has internet access to fetch data from the API.
    * For security and simplicity of this app's setup, we use a javascript file as an env store holding the api key.
    * Create a file called `env-injector.js` and inside create a const variable called `API_KEY` holding your MealDB API key.
      * Example: `const API_KEY = 1;`
    * No other external dependencies are required as it's a pure HTML, CSS, and JavaScript project.

## Usage after Transfer

1.  **Open `index.html`:**
    * Open `index.html` in your web browser to view the application.

2.  **Explore Recipes:**
    * Use the "Get Another Random Recipe" button or refresh the Home page to generate a new recipe.
    * Click the "10 Random Recipes" button to view a list of 10 random recipes.
    * Click on a recipe in the list to view its details.
