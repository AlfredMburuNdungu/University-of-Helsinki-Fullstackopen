### Creating a New Note

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    User->>Browser: Writes note and clicks save
    Browser->>Server: POST request with new note data
    Server->>Database: Store new note
    Database-->>Server: Confirmation
    Server-->>Browser: Response (Success/Failure)
    Browser-->>User: Displays updated UI
