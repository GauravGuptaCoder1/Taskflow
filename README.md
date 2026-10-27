# ✅ Taskflow — Task Management Web Application

**Organize your work. Track your progress. Get things done.**

Taskflow is a task management web application designed to help users organize their tasks, prioritize their work, and track progress through a clean, intuitive interface. Built using Node.js, Express.js, EJS, and MySQL, it provides essential CRUD operations and task filtering capabilities in a modern dark-themed UI.

---

## ✨ Features

* 📝 **Task Management (CRUD)** — Create, view, edit, and delete tasks.
* 📊 **Dashboard Statistics** — Get an overview of total tasks and their completion status.
* 🔄 **Status Tracking** — Track tasks as Pending, In Progress, or Completed.
* 🎯 **Priority Management** — Assign Low, Medium, or High priority to tasks.
* 🔍 **Search Functionality** — Find tasks quickly by searching their titles.
* 🗂️ **Filtering Options** — Filter tasks by status and priority.
* ☑️ **Quick Completion Toggle** — Mark tasks as completed or return them to Pending.
* 🌙 **Dark Theme** — A modern, dark-themed interface designed for a focused experience.
* 📱 **Responsive Interface** — Designed to provide a consistent experience across screen sizes.

---

## 🛠️ Tech Stack

| Technology         | Purpose                                                       |
| ------------------ | ------------------------------------------------------------- |
| 🟢 Node.js         | JavaScript runtime                                            |
| 🚂 Express.js      | Server-side framework and routing                             |
| 🧩 EJS             | Dynamic HTML templating                                       |
| 🐬 MySQL           | Relational database                                           |
| 🔌 mysql2          | MySQL database connectivity                                   |
| 🎨 HTML5 & CSS3    | Structure and styling                                         |
| 🔣 Font Awesome    | Icons                                                         |
| 🔀 method-override | Support for HTTP methods such as PUT and DELETE through forms |
| 🆔 UUID            | Unique task identifiers                                       |
| 🔐 dotenv          | Environment variable management                               |
| 🌱 Git & GitHub    | Version control and project hosting                           |

---

## ⚙️ Getting Started

Follow these steps to run Taskflow on your local machine.

### 📋 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [MySQL](https://www.mysql.com/)
* [Git](https://git-scm.com/)

You will also need a MySQL client, such as MySQL Workbench, to create and manage the database.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/GauravGuptaCoder1/Taskflow.git
```

Navigate to the project directory:

```bash
cd Taskflow
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project's root directory, alongside `index.js` and `package.json`.

Add your MySQL connection details:

```dotenv
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

Replace the example values with your own MySQL credentials and the name of your database.

### 4️⃣ Set Up the Database

Create a MySQL database and a `tasks` table matching the fields used by the application.

The table should support the following task attributes:

| Column        | Description                     |
| ------------- | ------------------------------- |
| `id`          | Unique identifier for each task |
| `title`       | Task title                      |
| `description` | Details about the task          |
| `created_at`  | Task creation timestamp         |
| `status`      | Task status                     |
| `priority`    | Task priority                   |

> **Note:** Ensure that the column types and constraints match the queries in `index.js`. If your project already has a database setup script, use that script instead.

### 5️⃣ Start the Application

Run the application using your configured start command. If you start the server directly through `index.js`, use:

```bash
node index.js
```

Open your browser and navigate to:

**http://localhost:8080**

---

## 📁 Project Structure

```text
Taskflow/
├── public/              # Static assets and CSS
├── views/               # EJS templates
├── .env                 # Local environment variables (not committed)
├── .gitignore           # Files excluded from Git
├── index.js             # Express server and application routes
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Dependency lockfile
└── README.md            # Project documentation
```

---

## 🎯 Task Statuses & Priorities

### 📌 Task Status

| Status         | Description                          |
| -------------- | ------------------------------------ |
| 🟡 Pending     | The task has not been completed yet. |
| 🔵 In Progress | Work on the task is underway.        |
| 🟢 Completed   | The task has been completed.         |

### 🚦 Task Priority

| Priority  | Description                                   |
| --------- | --------------------------------------------- |
| 🟢 Low    | Tasks that can be handled with less urgency.  |
| 🟠 Medium | Tasks that require moderate attention.        |
| 🔴 High   | Tasks that need greater attention or urgency. |

---

## 🔮 Future Enhancements

Potential improvements for future versions include:

* 👤 User authentication and personalized task lists
* 📅 Task deadlines and reminders
* 📈 More detailed productivity analytics
* 🏷️ Custom categories and tags
* ☁️ Cloud deployment and hosted database integration

---

## 📚 Learning Outcomes

This project provides practical experience with:

* Building a server-side web application using Node.js and Express.js
* Rendering dynamic pages using EJS
* Implementing CRUD operations
* Connecting an application to a MySQL database
* Handling form submissions and HTTP method overrides
* Implementing search, filtering, and task status management
* Managing environment variables and using Git for version control

---

## 👨‍💻 Author

**Gaurav Gupta**

* GitHub: https://github.com/GauravGuptaCoder1

---

## 📄 License

No license has been specified yet. Unless a license is added, others generally do not have permission to reuse, distribute, or modify the project simply because it is publicly visible on GitHub.

---

<p align="center">
  <b>Built with ❤️ to make task management simpler.</b>
</p>
