  const employees = [
  {
    id: 1,
    firstName: "Aarav",
    email: "e@e.com",
    password: "123",

    taskNumber: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 0,
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,

        taskTitle: "Design Login Page",

        taskDescription:
          "Create responsive login page UI.",

        taskDate: "2026-06-17",

        category: "Design",
      },

      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,

        taskTitle: "Fix Navbar",

        taskDescription:
          "Resolve navbar alignment issues.",

        taskDate: "2026-06-14",

        category: "Frontend",
      },
    ],
  },

  {
    id: 2,

    firstName: "Vivaan",

    email: "employee2@example.com",

    password: "123",

    taskNumber: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 0,
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,

        taskTitle: "Build Dashboard",

        taskDescription:
          "Create employee dashboard with task summary cards.",

        taskDate: "2026-06-20",

        category: "Frontend",
      },

      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,

        taskTitle: "Fix Footer",

        taskDescription:
          "Improve footer responsiveness for mobile devices.",

        taskDate: "2026-06-15",

        category: "Frontend",
      },

      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,

        taskTitle: "Profile Page",

        taskDescription:
          "Create profile page for employees.",

        taskDate: "2026-06-22",

        category: "React",
      },
    ],
  },

  {
    id: 3,

    firstName: "Aditya",

    email: "employee3@example.com",

    password: "123",

    taskNumber: {
      active: 1,
      newTask: 0,
      completed: 1,
      failed: 1,
    },

    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,

        taskTitle: "Implement Context API",

        taskDescription:
          "Create AuthContext and provide user data globally.",

        taskDate: "2026-06-18",

        category: "React",
      },

      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,

        taskTitle: "Setup Tailwind",

        taskDescription:
          "Install and configure Tailwind CSS.",

        taskDate: "2026-06-12",

        category: "Setup",
      },

      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,

        taskTitle: "Dark Mode",

        taskDescription:
          "Add dark mode toggle using Context API.",

        taskDate: "2026-06-10",

        category: "UI",
      },
    ],
  },

  {
    id: 4,

    firstName: "Ishaan",

    email: "employee4@example.com",

    password: "123",

    taskNumber: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 0,
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,

        taskTitle: "Create Login UI",

        taskDescription:
          "Design login page with Tailwind CSS.",

        taskDate: "2026-06-21",

        category: "Design",
      },

      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,

        taskTitle: "Employee Cards",

        taskDescription:
          "Create task summary cards for employees.",

        taskDate: "2026-06-19",

        category: "Frontend",
      },

      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,

        taskTitle: "Navbar",

        taskDescription:
          "Create responsive navbar.",

        taskDate: "2026-06-11",

        category: "Frontend",
      },
    ],
  },

  {
    id: 5,

    firstName: "Arjun",

    email: "employee5@example.com",

    password: "123",

    taskNumber: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1,
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,

        taskTitle: "Task CRUD",

        taskDescription:
          "Implement create, update and delete task features.",

        taskDate: "2026-06-22",

        category: "React",
      },

      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,

        taskTitle: "Local Storage",

        taskDescription:
          "Store employee data in localStorage.",

        taskDate: "2026-06-16",

        category: "Storage",
      },

      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,

        taskTitle: "Search Employee",

        taskDescription:
          "Implement search functionality for employees.",

        taskDate: "2026-06-13",

        category: "Feature",
      },
    ],
  },
]

const admin = [
  {
    id: 1,

    firstName: "Darsh",

    email: "admin@example.com",

    password: "123",
  },
]

export const setLocalStorage = () => {


  if (!localStorage.getItem("employees")) {

    localStorage.setItem(

      "employees",

      JSON.stringify(employees)

    )

  }

  if (!localStorage.getItem("admin")) {

    localStorage.setItem(

      "admin",

      JSON.stringify(admin)

    )

  }

}

export const getLocalStorage = () => {

  const employee = JSON.parse(

    localStorage.getItem("employees")

  )

  const admin = JSON.parse(

    localStorage.getItem("admin")

  )

  return {

    employee,

    admin,

  }

}