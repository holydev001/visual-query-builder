# QueryCraft

<div>

### Build Complex Queries Visually

Design, validate, preview, and execute database queries through an intuitive visual interface.

Supports SQL, MySQL, MongoDB, and GraphQL generation from a single query definition.

</div>

---

## Overview

QueryCraft is a modern visual query builder that transforms complex filtering logic into an intuitive drag-and-drop experience.

Instead of manually writing query syntax, users can visually create nested conditions, generate multiple query formats, validate query structures, and execute against datasets.

Whether you're a developer, analyst, or product team member, QueryCraft makes building queries significantly faster and easier.

---

## Why QueryCraft?

Writing queries manually often means:

- Learning database-specific syntax
- Managing deeply nested conditions
- Switching between query languages
- Debugging malformed query structures
- Rewriting the same logic repeatedly

QueryCraft solves these problems by providing a visual query-building workflow.

```text
Build Logic
    ↓
Generate Query
    ↓
Validate Structure
    ↓
Execute Results
```

---

# Features

## Visual Query Builder

Build complex filtering logic using a recursive visual interface.

### Capabilities

- Unlimited nested groups
- AND / OR logic
- Drag-and-drop reordering
- Collapsible groups
- Schema-aware fields
- Dynamic operators

---

## Multi-Output Generation

Generate multiple query formats from the same visual query structure.

### Supported Outputs

- SQL
- MySQL
- MongoDB
- GraphQL

Example:

### Visual Query

```text
Age > 18
AND
Country = Nigeria
AND
Status = Active
```

### MongoDB Output

```json
{
  "$and": [
    {
      "age": {
        "$gt": 18
      }
    },
    {
      "country": {
        "$eq": "Nigeria"
      }
    },
    {
      "status": {
        "$eq": "active"
      }
    }
  ]
}
```

---

## Dynamic Dataset Support

QueryCraft adapts automatically based on the selected dataset.

### Available Datasets

#### Users

```text
name
age
country
status
createdAt
```

#### Orders

```text
customer
amount
status
country
createdAt
```

#### Events

```text
title
category
severity
user
createdAt
```

Each dataset dynamically updates:

- Available fields
- Supported operators
- Input components
- Validation rules
- Query execution

---

## Query Validation

Validate queries before execution.

### Validation Checks

- Empty groups
- Missing fields
- Missing operators
- Missing values
- Invalid structures

This helps prevent malformed queries before execution.

---

## Query Execution Engine

Execute queries manually against datasets.

### Features

- Manual execution workflow
- Loading states
- Dataset-aware results
- Dynamic result tables
- Empty-state handling

---

## Workspace Management

Manage your query workflow efficiently.

### Includes

- Query history
- Preset management
- Undo / Redo
- Import / Export
- Persistent local storage

---

# Workflow

## 1. Select Dataset

Choose a dataset:

- Users
- Orders
- Events

---

## 2. Build Logic

Create conditions and groups visually.

Example:

```text
( Age > 18 )

AND

(
  Country = Nigeria
  OR
  Status = Active
)
```

---

## 3. Generate Output

Preview generated query syntax instantly.

### SQL

```sql
SELECT *
FROM users
WHERE age > 18
AND (
  country = 'Nigeria'
  OR status = 'active'
);
```

### MongoDB

```json
{
  "$and": [
    {
      "age": {
        "$gt": 18
      }
    },
    {
      "$or": [
        {
          "country": {
            "$eq": "Nigeria"
          }
        },
        {
          "status": {
            "$eq": "active"
          }
        }
      ]
    }
  ]
}
```

---

## 4. Execute

Run the query against mock datasets and inspect matching records.

---

# Architecture

## Query Tree Structure

```text
Group
├── Condition
├── Condition
└── Group
    ├── Condition
    └── Condition
```

Groups contain:

- Logic type (AND / OR)
- Child conditions
- Nested groups

Conditions contain:

- Field
- Operator
- Value

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript

## State Management

- Zustand

## Styling

- Tailwind CSS v4

## Animations

- Framer Motion

## Drag & Drop

- dnd-kit

## Theme Management

- next-themes

---

# Project Structure

```text
src
│
├── app
│
├── components
│   ├── query-builder
│   ├── query-controls
│   ├── query-preview
│   ├── query-results
│   └── shared
│
├── store
│
├── mock
│
├── types
│
└── lib
    ├── validation
    ├── traversal
    ├── helpers
    └── query-engine
```

---

# Current Functionality

## Completed

- Landing page
- Visual query builder
- Dynamic datasets
- Recursive groups
- Drag and drop
- Query validation
- Query execution
- Query previews
- History management
- Presets
- Import / Export
- Local persistence
- Dark / Light mode
- Documentation

---

## Roadmap

### Phase 2

- Real database connectors
- Query sharing
- Saved workspaces
- Team collaboration
- Query templates
- API integrations

### Phase 3

- AI-assisted query generation
- Natural language → query conversion
- Query optimization suggestions
- Live database execution

---

# Development

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Run linting:

```bash
pnpm lint
```

---

# Vision

QueryCraft aims to become the fastest way to design, understand, validate, and execute queries visually across multiple database technologies.

Instead of learning query syntax, users focus on logic.

**Build visually. Generate instantly. Execute confidently.**
