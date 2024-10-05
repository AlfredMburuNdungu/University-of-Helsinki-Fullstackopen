### User Interaction with Single-Page App (SPA)

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    
    User->>Browser: Enters URL https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>Server: GET request for SPA
    Server-->>Browser: Responds with HTML, CSS, JavaScript
    Browser->>Browser: Renders HTML and executes JavaScript
    Browser->>Server: AJAX requests for data (notes, etc.)
    Server-->>Browser: Responds with JSON data
    Browser->>Browser: Updates UI with fetched data
    User->>Browser: Interacts with the SPA
    Browser->>Server: Sends requests for operations (create, edit, delete)
    Server->>Server: Processes operations
    Server-->>Browser: Responds to requests
    Browser->>Browser: Updates UI based on responses
