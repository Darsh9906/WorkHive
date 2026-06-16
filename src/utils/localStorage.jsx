localStorage.clear()

const employees = [
  {
    id: 1,
    firstName: "Aarav",
    email: "e@e.com",
    password: "123",

    taskNumber: {
      active: 2,
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

        taskTitle: "Design Login Page",

        taskDescription:
          "Create responsive login page UI.",

        taskDate: "2026-06-17",

        category: "Design",
      },

      {
        active: true,
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
      completed: 0,
      failed: 0,
    },

    tasks: [],
  },

  {
    id: 3,

    firstName: "Aditya",

    email: "employee3@example.com",

    password: "123",

    taskNumber: {
      active: 0,
      newTask: 0,
      completed: 2,
      failed: 0,
    },

    tasks: [],
  },

  {
    id: 4,

    firstName: "Ishaan",

    email: "employee4@example.com",

    password: "123",

    taskNumber: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 0,
    },

    tasks: [],
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

    tasks: [],
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