# Repo Tree: be-boiler-plate

**Generated:** 31/10/2025, 14:03:13
**Root Path:** `/Users/satyam/workspace/aventis-workspace/be-boiler-plate`

```
├── 📁 .github
│   └── 📁 workflows
│       ├── ⚙️ deploy.yml
│       ├── ⚙️ prd_deploy.yml
│       ├── ⚙️ slack_notify.yml
│       ├── ⚙️ stg_deploy.yml
│       └── ⚙️ uat_deploy.yml
├── 📁 cmd
│   ├── 📁 app
│   │   ├── 📁 middlewares
│   │   │   ├── 🐹 main.go
│   │   │   ├── 🐹 middleware_idempotency.go
│   │   │   └── 🐹 types.go
│   │   ├── 🐹 app.go
│   │   ├── 🐹 routes.go
│   │   └── 🐹 routes_ontology.go
│   └── 📁 server
│       └── 🐹 main.go
├── 📁 config
│   └── ⚙️ local.example.yml
├── 📁 hooks
│   └── 📄 pre-commit
├── 📁 internal
│   ├── 📁 clients
│   │   ├── 🐹 main.go
│   │   └── 🐹 types.go
│   ├── 📁 config
│   │   └── 🐹 config.go
│   ├── 📁 controllers
│   │   ├── 🐹 controller_health.go
│   │   ├── 🐹 main.go
│   │   └── 🐹 types.go
│   ├── 📁 models
│   │   ├── 🐹 logs.go
│   │   └── 🐹 types.go
│   ├── 📁 repositories
│   │   ├── 🐹 main.go
│   │   ├── 🐹 repo_health.go
│   │   └── 🐹 types.go
│   ├── 📁 requests
│   │   └── 🐹 requests_ontology.go
│   ├── 📁 response
│   │   ├── 🐹 error_ontology.go
│   │   ├── 🐹 errors.go
│   │   └── 🐹 response.go
│   └── 📁 services
│       ├── 🐹 main.go
│       ├── 🐹 service_health.go
│       └── 🐹 types.go
├── 📁 k8s
│   ├── ⚙️ deployment.yml
│   └── 📄 k8s-deployment.sh
├── 📁 migrations
│   ├── 📁 mysql
│   │   ├── 📄 20250113054757_logs.down.sql
│   │   └── 📄 20250113054757_logs.up.sql
│   └── 📁 postgres
│       ├── 📄 20250113054757_logs.down.sql
│       └── 📄 20250113054757_logs.up.sql
├── ⚙️ .gitignore
├── 🐳 Dockerfile
├── 📄 Makefile
├── ⚙️ bitbucket-pipelines.yml
├── 📄 go.mod
├── 📄 go.sum
├── 📝 readme.md
└── 📄 runner.sh
```

---
