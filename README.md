# African Leadership University - Random Recipe Generator

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
-   **Search Recipe:** A text input on every page allows the users to find their favorite recipe by name
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

-   `index.html`: Home page displaying a random recipe.
-   `index.js`: JavaScript logic for the home page.
-   `recipes.html`: Page displaying 10 random recipes.
-   `recipes.js`: JavaScript logic for the 10 random recipes page.
-   `details.html`: Page displaying detailed recipe information.
-   `details.js`: JavaScript logic for the recipe details page.
-   `search.html`: Page displaying recipes search results.
-   `search.js`: JavaScript logic for the recipe search page.
-   `styles.css`: Shared CSS styles for all pages.

## Setup and Usage + Guide Docs

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

4. **My Generous Docs:** (in ./docs/ directory)

    -   [How to run the code locally](./docs/run-me-local.md)
    -   [How to transfer the code to the server](./docs/code-transfer.md)
    -   [How to setup nginx for this project](./docs/nginx-setup-guide.md)
    -   [How to run the code on your webserver](./docs/run-me-webserver.md)
    -   [How to setup ci/cd to automate your deployments](./docs/cicd-setup-guide.md) (Bonus)

## Credits

-   MealDB API: For providing the recipe data.
-   devark28: For developing and deploying the application.

## Demo Video

[Link to the demo video](https://youtu.be/z8jNRqXPxak)

## Deployment

- https://recipes.bruceshimwa.tech points to the load balancer and distributes traffic using a round robbin algorithm.
- i added a virtual server to my web servers to listen for https://recipes.bruceshimwa.tech domain and point to my recipes code's directory
- my nginx configuration allows me to still have my resume https://bruceshimwa.tech and the recipes website on the same server.
```
server {
    listen 80;
    server_name bruceshimwa.tech www.bruceshimwa.tech;
    error_page 404 /404.html;
    add_header X-Served-By $hostname;

    location = /404.html {
        root /var/www/html;
    }

    location / {
	root /home/ubuntu/alu-responsive-resume/;
    }

    location /redirect_me {
        return 301 https://www.youtube.com/watch?v=dQw4w9WgXcQ;
    }
}

server {
    listen 80;
    server_name recipes.bruceshimwa.tech;
    add_header X-Served-By $hostname;

    location / {
        root /home/ubuntu/alu-recipe-web/;
    }
}
```

## Challenges and Solutions

- Scrapping the web for a useful API that matches the rubrics criteria
- testing the API to see if it works fine, some APIs didn't work
- dealing with images with this api like displaying and fetching them.

## Future Improvements

-   Implement user authentication to save favorite recipes.
-   Improve search functionality to find recipes by ingredients not just by name.
-   Improve the UI/UX with more interactive elements.
-   Add more advanced filtering options.
-   Add unit tests.
-   Add a recipe rating system.
-   But this is just a school assignment! 😂

## License

- [WTFPL](https://en.wikipedia.org/wiki/WTFPL)

## Addendum

- managed to redirect a subdomain of my domain to github pages. https://recipes-git.bruceshimwa.tech
