# CI/CD Setup Guide for ALU Recipes Web with Python Webhook

This guide outlines how to set up a CI/CD pipeline for the ALU Recipes Web application using a Python webhook for automated deployment.

## Deployment Strategy

* We will use a Python script (`py_cicd_script.py`) to act as a webhook.
* This script will listen for requests on a specified route (`/cicd_webhook`).
* Upon receiving a request, the script will pull the latest code from the GitHub repository.
* Since the application is served as static files, there's no server restart required; only the file updates are needed.

## Prerequisites

* Python 3 installed on your server.
* Git installed on your server.
* The `py_cicd_script.py` file in your project directory.
* A web server (e.g., Nginx) configured to route requests to the Python script's port.

## Steps

1.  **Configure `py_cicd_script.py`:**
    * Ensure the script is executable and contains the correct repository URL and directory path.

2.  **Run `py_cicd_script.py`:**
    * Run the Python script on your server:
      <br/>

      ```bash
      ./py_cicd_script.py
      ```

3.  **Configure Nginx (or another web server):**
    * Configure your web server to proxy requests to the port the Python script is running on (e.g., port 8080 in the example).
    * Example Nginx configuration:
      <br/>

      ```nginx
      location /your_webhook_route { #replace your_webhook_route
          proxy_pass http://localhost:8080;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
      ```

4.  **Set up GitHub Webhook:**
    * In your GitHub repository, go to "Settings" > "Webhooks" > "Add webhook".
    * Set the "Payload URL" to your server's URL with the webhook route (e.g., `http://yourdomain_or_ip.com/your_webhook_route`).
    * Set the "Content type" to `application/json`.
    * Choose "Just the push event".
    * Click "Add webhook".

5.  **Test the Webhook:**
    * Make a change to your code and push it to GitHub.
    * The GitHub webhook should trigger the Python script, and the script should pull the latest code to your server.

## Notes

* Ensure the Python script has the necessary permissions to execute Git commands.
* For production environments, consider using a process manager (e.g., systemd, Supervisor) to ensure the Python script runs continuously.
* Enhance security by validating the webhook payload and adding authentication.
* If you encounter issues with ports, ensure that they are open.
