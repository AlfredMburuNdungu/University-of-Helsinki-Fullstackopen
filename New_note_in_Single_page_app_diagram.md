### User Creates a New Note in Single-Page App (SPA)

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database
    
    User->>Browser: Writes note and clicks save
    Browser->>Server: POST request with new note data
    Server->>Database: Stores new note
    Database-->>Server: Confirmation of storing note
    Server-->>Browser: Responds with success message
    Browser->>Browser: Updates UI to display new note
