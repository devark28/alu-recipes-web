#!/usr/bin/python3
from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess

class SimpleHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/cicd_webhook':
            try:
                # Execute the bash script
                result = subprocess.run(['/bin/bash', 'cicd_pull_script.sh'], capture_output=True, text=True, check=True)
                self.send_response(200)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b"Operation successful\n")
                print(result.stdout, end="")

            except subprocess.CalledProcessError as e:
                self.send_response(500)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b"Error executing script.\n")
                print(f"Error executing script: {e.stderr}", end="")

            except FileNotFoundError:
                self.send_response(404)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b"Script not found.\n")

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b"Internal server error.")
                print(f"Internal server error: {e}")

        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Resource not found.\n")
            print(f"Resource not Found: /{self.path}")

def run(server_class=HTTPServer, handler_class=SimpleHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nKeyboard interrupt received, shutting down the server.")
        httpd.server_close() 
        exit(0) 
    except Exception as e:
        print("found one you didn't fix!")

if __name__ == "__main__":
    run()
