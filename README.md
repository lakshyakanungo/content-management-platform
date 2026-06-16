
# Content Management Platform

![Rails](https://img.shields.io/badge/Rails-7-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Render](https://img.shields.io/badge/Hosted%20on-Render-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A robust, developer-centric Content Management System (CMS) built with Ruby on Rails, featuring a complete content creation workflow, automated scheduling, granular version control, an integrated analytics engine, and a public-facing knowledge base.

🔗 **Live Demo:** https://content-management-platform.onrender.com

---

## Overview

Content Management Platform is a full-stack CMS designed to simulate workflows commonly found in modern publishing and knowledge-base platforms.

The application provides article authoring, publishing, scheduling, version management, analytics, category management, SEO-friendly redirections, and configurable site settings through an intuitive administration interface.

---

## Features

### 📝 Article Management

- Create and edit articles
- Rich WYSIWYG editor for content authoring
- Save articles as drafts or publish them
- Schedule future article updates
- Search articles by title
- Pagination for large article datasets

### 📚 Article Versioning

- Automatically maintain article revision history
- View previous versions of an article
- Restore any previous version with a single action
- Preserve editorial audit trails

### 🗂 Category Management

- Create, update, and delete categories
- Reorder categories
- Group articles by category
- Search categories

### 📊 Content Dashboard

- Filter articles by publication status
- Dynamically configure visible table columns
- Pagination support
- Search and content discovery tools

### 🌐 End User Knowledge Base

- Public-facing article browsing experience
- Category-based article organization
- Searchable content structure
- Knowledge-base style navigation

### ⚙️ Site Configuration

- Configure site title
- Manage article URL redirections
- Password-protect the public knowledge base
- Manage content taxonomy

### 📈 Analytics

- Track article visits
- View article performance metrics
- Download analytics reports

---

## Editorial Workflow

```text
Draft → Scheduled → Published → Updated → Versioned → Restored
```

---

## Technical Highlights

### Content Versioning

Every article modification creates a historical revision, enabling:

- Content recovery
- Editorial auditing
- Change tracking
- Rollback capabilities

### Scheduled Publishing

Article updates can be scheduled for future execution, allowing content teams to plan releases in advance.

### SEO-Friendly Redirects

Redirect management allows administrators to preserve link integrity when article URLs change.

### Analytics Tracking

Article visits are tracked and aggregated for reporting and content performance analysis.

---

## Screenshots

### Article Dashboard

Manage, search, filter, and organize content through a centralized dashboard.

<img width="1512" height="805" alt="image" src="https://github.com/user-attachments/assets/fd05c6c3-823f-44bb-a4d2-14ea29a601aa" />


### Article Editor

Create and update articles using a rich WYSIWYG editing experience.

<img width="1512" height="805" alt="image" src="https://github.com/user-attachments/assets/a3245e23-8069-43a0-8506-91105ef65b07" />


### Version History

Inspect historical revisions and restore previous versions when required.

<img width="1462" height="502" alt="image" src="https://github.com/user-attachments/assets/7a86a9e7-3923-4cb7-9cb9-b36790d6aba2" />

### End User Interface / Knowledge Base

A clean, minimal, content-first interface optimized for readability and easy searching of articles. Can be password protected and supports redirections for articles.

<img width="1512" height="665" alt="image" src="https://github.com/user-attachments/assets/34cab78e-d0d5-4bb6-a45a-80c23dd0ab8c" />


### Site Settings

Configure site-level settings, redirects, security, and category management.

<img width="1512" height="476" alt="image" src="https://github.com/user-attachments/assets/e97c0950-d1ac-4100-ab84-639377637ba6" />


### Analytics Dashboard

Track content engagement and export analytics reports.

<img width="1512" height="808" alt="image" src="https://github.com/user-attachments/assets/e374b3c0-0f18-4ee9-abbb-d0e9343fb8cf" />


---

## Technology Stack

### Backend

- Ruby on Rails
- PostgreSQL
- Active Record
- Sidekiq

### Frontend

- React.js
- Tailwind CSS

### Infrastructure

- Render
- GitHub

---

## Application Modules

| Module | Description |
|----------|-------------|
| Articles | Create, edit, publish, and schedule content |
| Version History | Track and restore article revisions |
| Categories | Organize and manage content taxonomy |
| Dashboard | Search, filter, and manage articles |
| Knowledge Base | Public-facing article portal |
| Redirects | SEO-friendly URL management |
| Settings | Site-wide configuration |
| Analytics | Article visit tracking and reporting |

---

## Architecture

The application follows standard Rails conventions with clear separation of concerns.

```text
app/
├── controllers/
├── models/
├── views/
├── services/
├── jobs/
├── javascript/
└── helpers/
```

### Core Domain Areas

- Articles
- Categories
- Article Versions
- Redirects
- Analytics
- Site Settings

---

## Local Development Setup

### Prerequisites

- Ruby (see `.ruby-version`)
- Node.js v18.12+
- PostgreSQL
- Yarn
- Bundler

### Clone Repository

```bash
git clone https://github.com/lakshyakanungo/content-management-platform.git

cd content-management-platform
```

### Install Node Version

```bash
nvm install
```

### Install Dependencies and Seed Database

```bash
./bin/setup
```

This command will:

- Install Ruby gems
- Install JavaScript dependencies
- Create the database
- Run migrations
- Seed development data

### Start Application

```bash
bundle exec rails server -p 3000
```

Visit:

```text
http://localhost:3000
```

---

## Future Improvements

- User authentication and authorization
- Role-based access control
- Article approval workflows
- Content tagging
- Full-text search
- Public API support
- Dashboard visualizations
- Real-time collaboration

