# Running ALU Recipes Web on a Web Server

This guide explains how to deploy and run the ALU Recipes Web application on a web server, focusing on a static file-serving approach using Nginx.

## Prerequisites

* A web server (e.g., Nginx) with appropriate permissions.
* The project files copied to a directory on your server. Refer to the [Code Transfer Guide](./code-transfer.md) for instructions on transferring the files.
* Nginx installed and configured on your server.

## Deployment Steps

1.  **Transfer Files to the Server:**
    * Follow the instructions in the [Code Transfer Guide](./code-transfer.md) to copy the project files to your server. Ensure the directory structure is maintained.

2.  **Configure Nginx:**
    * Use the instructions provided in the [Nginx Setup Guide](./nginx-setup-guide.md) to configure Nginx to serve the static files from your project directory.
    * Specifically, create an Nginx configuration file (e.g., `alu-recipes`) in `/etc/nginx/sites-available/` and configure the `server` block with the correct `root` and `index` directives.
    * Enable the configuration by creating a symbolic link in `/etc/nginx/sites-enabled/`.
    * Test the Nginx configuration and reload Nginx to apply the changes.

3.  **Ensure Dependencies:**
    * As outlined in the [Code Transfer Guide](./code-transfer.md), the application requires internet access to fetch data from the MealDB API.
    * Ensure the `env-injector.js` file, containing your MealDB API key, is correctly placed in the project directory.

4.  **Access the Application:**
    * Once Nginx is configured and running, access your application through your server's domain or IP address in a web browser.

## Notes

* Ensure your server's firewall allows HTTP traffic on port 80 (or the port you configured Nginx to listen on).
