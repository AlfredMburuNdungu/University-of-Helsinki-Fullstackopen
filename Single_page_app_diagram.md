sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database
    
    User->>Browser: Enters URL https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>Server: GET request for SPA
    Server-->>Browser: Responds with HTML file
    Browser->>Server: Requests assets (CSS, JavaScript)
    Server-->>Browser: Sends CSS and JavaScript files
    Browser->>Browser: Renders HTML and executes JavaScript
    Browser->>Server: AJAX requests for data
    Server-->>Browser: Responds with JSON data (notes, etc.)
    Browser->>Browser: Updates UI with fetched data
    User->>Browser: Interacts with the SPA
    Browser->>Server: Sends requests for operations (create, edit, delete)
    Server->>Database: Processes operations
    Database-->>Server: Confirmation of operations
    Server-->>Browser: Responds to requests
    Browser->>Browser: Updates UI based on responses