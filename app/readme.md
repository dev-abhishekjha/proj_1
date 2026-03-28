# Project Development Guide

## 1. Install fswatch

🔧 Install the `fswatch` tool for monitoring file changes during development.

## 2. Run Docker Services Container

- 🐳 Clone the `dev` [repository](https://bitbucket.org/aventistech/dev/src/main).
- 📂 Inside the base folder, run:

```bash
cd base && docker compose up

# To create all databases for all services run
cd base && ./create_all_database.sh
```

- 🗄️ Create the database. The default username and password are `postgres` and `postgres`.

## 3. Configure Local Settings

📄 Copy `local.example.yml` to `local.yml`, and 🛠️ modify it as per your needs.

## 4. Enable Hot Reloading

🚀 Use the following command to enable hot reloading while developing the API:

```bash
make run-live
```

## 5. Understand the Project Architecture

🏗️ The project follows **Layered Architecture** (also known as Clean Architecture). It separates the application into distinct layers to improve maintainability, testability, and scalability. Here's a breakdown:

- **Controller**: 🎛️ Handles HTTP requests, parses inputs, and sends responses. It's the entry point for user interaction.
- **Service**: 🛠️ Implements business logic and acts as an intermediary between controllers and repositories.
- **Repository**: 📂 Manages database interactions, encapsulating persistence logic (CRUD operations).
- **Client**: 🌐 Often used for external API integrations or communication with other services.

This separation follows the **Single Responsibility Principle** and ensures a clean dependency flow.

## 6. Scope-Based Authorization

🔐 All protected API endpoints implement **scope-based authorization** to control access based on user permissions.

### Defining Scopes

Scopes are defined as **global constants** in the route file where they are used:

```go
// In cmd/app/routes_events.go

// Scope constants for events endpoints
const (
    ScopeEventsView   = "events:view"
    ScopeEventsCreate = "events:create"
    ScopeEventsManage = "events:manage"
)
```

### Scope Naming Convention

Follow this pattern: `[feature]:[action]`

Examples:
- `events:view` - Read-only access to events
- `events:create` - Create new events
- `events:manage` - Full management (create, update, delete)
- `users:view` - Read-only access to users
- `users:manage` - Full user management

### Using Scopes in Routes

Apply scope middleware to protected endpoints:

```go
// User needs at least one of the specified scopes
v1Protected.POST("/create", 
    middlewares.Scopes.HasAnyOneScope(ScopeEventsCreate, ScopeEventsManage), 
    controller.Events.CreateEvent)

// User needs all of the specified scopes
v1Protected.DELETE("/:id", 
    middlewares.Scopes.HasAllScopes(ScopeEventsManage, ScopeAdminAccess), 
    controller.Events.DeleteEvent)
```

### Available Scope Middleware Methods

- **`HasAnyOneScope(scopes ...string)`** - User must have at least one of the specified scopes
- **`HasAllScopes(scopes ...string)`** - User must have all of the specified scopes

## 8. Format Code

🖋️ Run the following command after every commit or change to format your code:

```bash
make fmt
```

## 9. Code Analysis

🔍 Run the following command to perform static code analysis:

```bash
make vet
```

## 10. Database Migration Generation

The `make migrate-new` command generates migration files for both MySQL and PostgreSQL databases. This creates four empty SQL files:


- 🚀 Run database migrations:
The migrations will be run automatically when the application starts.


## 11. Explore Makefile Commands

📜 The project includes a `Makefile` in the root directory. All commands are listed there for quick reference and efficient development workflow.

---

❓ If you have any queries, connect with others.

