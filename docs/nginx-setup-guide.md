# Nginx Setup Guide for ALU Recipes Web

This guide outlines how to set up Nginx to serve the ALU Recipes Web application.

## Prerequisites

* Nginx installed on your server.
* The project files copied to a directory on your server. [use this guide as a reference on how to do so](./code-transfer.md)

## Configuration

1.  **Create Nginx Configuration File:**
    * Create a new configuration file for your application in the Nginx `/etc/nginx/sites-available/` directory. For example, `alu-recipes`.

2.  **Configure Nginx:**
    * Add the following configuration to `alu-recipes`:
    <br/>
    
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com;

        root /path/to/alu-recipes-web;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }
    ```

    * Replace `yourdomain.com` with your domain name and `/path/to/alu-recipes-web` with the actual path to your project directory.

3.  **Enable the Configuration:**
    * Create a symbolic link to enable the configuration:
      <br/>

      ```bash
      sudo ln -s /etc/nginx/sites-available/alu-recipes /etc/nginx/sites-enabled/
      ```

4.  **Test and Reload Nginx:**
    * Test the Nginx configuration:
      <br/>

      ```bash
      sudo nginx -t
      ```

    * Reload Nginx to apply the changes:
      <br/>

      ```bash
      sudo service nginx restart
      ```

## Notes

* This configuration assumes you are serving the static files directly.
