# 🚀 WorkHive

**WorkHive** is a role-based employee task management application built with **React.js** and **Tailwind CSS**.

It provides separate dashboards for **Admins and Employees**, allowing administrators to manage employees and tasks while employees can view, complete, or fail their assigned tasks and track their task history.

The project was built as a hands-on React project to strengthen practical understanding of **state management, Context API, reusable components, localStorage, conditional rendering, CRUD operations, and working with nested data structures**.

---

## ✨ Features

### 👨‍💼 Admin

* Admin authentication
* Admin dashboard
* Create and assign tasks to employees
* View employee task information
* Manage task data
* Track task status
* Persistent login using `localStorage`

### 👨‍💻 Employee

* Employee authentication
* Personal employee dashboard
* View assigned active tasks
* View task details including:

  * Title
  * Description
  * Category
  * Priority
  * Due date
* Mark tasks as **Completed**
* Mark tasks as **Failed**
* Completed tasks automatically move to **Completed History**
* Failed tasks automatically move to **Failed History**
* Active task cards disappear after being completed or failed
* Task statistics dashboard
* Persistent login using `localStorage`

---

## 🖥️ Application Flow

```text
                    WorkHive
                       │
                ┌──────┴──────┐
                │             │
              Admin        Employee
                │             │
        ┌───────┴───────┐     │
        │               │     │
   Manage Tasks    Dashboard   │
        │                     │
        └──────────┐          │
                   ↓          ↓
              Assign Task → Active Tasks
                              │
                         ┌────┴────┐
                         ↓         ↓
                     Completed    Failed
                         │         │
                         ↓         ↓
                   Completed    Failed
                    History      History
```

---

## 📊 Dashboard

### Admin Dashboard

The admin dashboard provides an overview of employees and their assigned tasks, allowing the administrator to manage task assignments and monitor task progress.

### Employee Dashboard

Employees get a personalized dashboard containing:

* Active tasks
* New tasks
* Completed tasks
* Failed tasks
* Completed task history
* Failed task history

---

## 🛠️ Tech Stack

| Technology            | Purpose                                  |
| --------------------- | ---------------------------------------- |
| **React.js**          | UI development                           |
| **JavaScript (ES6+)** | Application logic                        |
| **Tailwind CSS**      | Styling and responsive UI                |
| **Context API**       | Global state management                  |
| **React Hooks**       | Component state and lifecycle management |
| **localStorage**      | Client-side data persistence             |
| **Vite**              | Development and build tooling            |

---

## 🧠 React Concepts Practiced

This project was built to apply React concepts through a real-world-style application rather than isolated examples.

### Core React

* Functional Components
* `useState`
* `useEffect`
* `useContext`
* Props
* Conditional Rendering
* Component Composition

### State Management

* Context API
* Global state
* State updates across multiple components
* Managing nested data structures
* Derived state

### JavaScript

* `map()`
* `filter()`
* `find()`
* Array manipulation
* Object manipulation
* ES6+ syntax
* Event handling

### Application Logic

* Role-based UI
* Task lifecycle management
* CRUD-style operations
* Authentication state
* Persistent client-side state
* Conditional UI based on task status

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Admin/
│   ├── Employee/
│   ├── Auth/
│   └── ...
│
├── context/
│   └── ...
│
├── pages/
│   ├── AdminDashboard/
│   ├── EmployeeDashboard/
│   └── ...
│
├── App.jsx
├── main.jsx
└── ...
```

> The exact folder structure may vary depending on the current implementation.

---

## 🔐 Authentication

WorkHive currently uses client-side authentication and maintains login state using browser `localStorage`.

The application provides separate experiences for:

* Admin
* Employee

Authentication in this project is intended for learning and demonstration purposes and is **not designed as production-grade authentication**.

---

## 💾 Data Persistence

WorkHive uses **localStorage** for client-side persistence.

This allows information such as login state and application data to remain available after refreshing the browser.

No external database is required to run the current version.

---

## 🔄 Task Lifecycle

Each task follows a simple lifecycle:

```text
Assigned
   ↓
Active
   │
   ├──→ Completed
   │       ↓
   │   Completed History
   │
   └──→ Failed
           ↓
       Failed History
```

When an employee completes or fails a task:

1. The task status is updated.
2. The task is removed from the active task list.
3. The task is stored in the appropriate history.
4. The corresponding task statistics are updated.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Darsh9906/WorkHive.git
```

### 2. Navigate to the project

```bash
cd WorkHive
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

---

## 📦 Build for Production

Create a production build with:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🎯 Project Goals

The main goal of WorkHive was to move beyond isolated React tutorials and practice building a complete frontend application with real application logic.

Through this project, I focused on understanding:

* How components communicate
* How shared state works
* How authentication state can be handled
* How task data can be structured
* How CRUD operations work
* How UI changes based on application state
* How data can persist across page refreshes
* How to structure a React application around real user roles

---

## 📚 What I Learned

WorkHive was an important step in my journey from learning individual React concepts to applying them together in a complete application.

Instead of only following tutorials, I used the project to understand how **state, components, user roles, data structures, persistence, and UI logic work together in a real application**.

---

## 👨‍💻 Author

**Darsh Bhatt**

---

## ⭐ Acknowledgement

This project was built as part of my hands-on learning journey with React.js and frontend development.


