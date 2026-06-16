const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Design Login Page",
        taskDescription: "Create responsive login page UI.",
        taskDate: "2026-06-17",
        category: "Design"
      },
      {
        active: true,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Fix Navbar",
        taskDescription: "Resolve navbar alignment issues.",
        taskDate: "2026-06-14",
        category: "Frontend"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "API Integration",
        taskDescription: "Integrate user authentication API.",
        taskDate: "2026-06-12",
        category: "Backend"
      }
    ]
  },

  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Dashboard",
        taskDescription: "Build admin dashboard UI.",
        taskDate: "2026-06-18",
        category: "Frontend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Write Unit Tests",
        taskDescription: "Add tests for authentication module.",
        taskDate: "2026-06-15",
        category: "Testing"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Optimize Queries",
        taskDescription: "Improve database query performance.",
        taskDate: "2026-06-20",
        category: "Database"
      }
    ]
  },

  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Implement Search",
        taskDescription: "Add search functionality.",
        taskDate: "2026-06-19",
        category: "Feature"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Refactor Code",
        taskDescription: "Clean up old components.",
        taskDate: "2026-06-13",
        category: "Maintenance"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Setup CI/CD",
        taskDescription: "Configure GitHub Actions.",
        taskDate: "2026-06-21",
        category: "DevOps"
      }
    ]
  },

  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Profile Page",
        taskDescription: "Design and implement user profile page.",
        taskDate: "2026-06-17",
        category: "Frontend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Bug Fixes",
        taskDescription: "Fix reported UI bugs.",
        taskDate: "2026-06-11",
        category: "Bug"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Add Notifications",
        taskDescription: "Implement notification system.",
        taskDate: "2026-06-22",
        category: "Feature"
      }
    ]
  },

  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Update Documentation",
        taskDescription: "Write API documentation.",
        taskDate: "2026-06-18",
        category: "Documentation"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Deploy App",
        taskDescription: "Deploy application to production.",
        taskDate: "2026-06-10",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Payment Gateway",
        taskDescription: "Integrate payment service.",
        taskDate: "2026-06-09",
        category: "Backend"
      }
    ]
  }
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123"
  }
];

export const setLocalStorage = () => {

    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('admin',JSON.stringify(admin))

}

export const getLocalStorage = () => {

    const employee = JSON.parse(localStorage.getItem('employees') )
    const admin = JSON.parse(localStorage.getItem('admin') )
        
    return {employee,admin}
}