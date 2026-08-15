const createTask = ({
  id,
  employeeId,
  title,
  description,
  priority = 'medium',
  dueDate = '',
  status = 'pending',
  category = 'General',
  createdAt,
  updatedAt,
  completedAt,
  failedAt,
}) => ({
  id: id || `task-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
  employeeId,
  title: title?.trim() || 'Untitled task',
  description: description?.trim() || '',
  priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
  dueDate,
  status: ['pending', 'completed', 'failed'].includes(status) ? status : 'pending',
  category: category?.trim() || 'General',
  createdAt: createdAt || new Date().toISOString(),
  updatedAt: updatedAt || new Date().toISOString(),
  completedAt: status === 'completed' ? completedAt || new Date().toISOString() : completedAt || null,
  failedAt: status === 'failed' ? failedAt || new Date().toISOString() : failedAt || null,
})

export const getTaskStats = (tasks = []) => {
  const safeTasks = Array.isArray(tasks) ? tasks : []
  return safeTasks.reduce(
    (acc, task) => {
      const status = task?.status || 'pending'
      if (status === 'completed') acc.completed += 1
      else if (status === 'failed') acc.failed += 1
      else acc.pending += 1
      return acc
    },
    { total: safeTasks.length, pending: 0, completed: 0, failed: 0 }
  )
}

export const normalizeTask = (task = {}, employeeId) => {
  return createTask({
    id: task.id,
    employeeId: task.employeeId ?? employeeId,
    title: task.title || task.taskTitle,
    description: task.description || task.taskDescription,
    priority: task.priority || 'medium',
    dueDate: task.dueDate || task.taskDate || '',
    status: task.status || (task.completed ? 'completed' : task.failed ? 'failed' : 'pending'),
    category: task.category || 'General',
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    completedAt: task.completedAt,
    failedAt: task.failedAt,
  })
}

export const syncEmployeeTaskStats = (employees = []) => {
  return (Array.isArray(employees) ? employees : []).map((employee) => {
    const normalizedTasks = (employee.tasks || []).map((task) => normalizeTask(task, employee.id))
    const stats = getTaskStats(normalizedTasks)

    return {
      ...employee,
      tasks: normalizedTasks,
      taskNumber: {
        total: stats.total,
        active: stats.pending,
        newTask: stats.pending,
        pending: stats.pending,
        completed: stats.completed,
        failed: stats.failed,
      },
    }
  })
}

export const persistEmployees = (employees = []) => {
  const normalizedEmployees = syncEmployeeTaskStats(employees)
  localStorage.setItem('employees', JSON.stringify(normalizedEmployees))
  return normalizedEmployees
}

const employees = [
  {
    id: 1,
    firstName: 'Aarav',
    email: 'e@e.com',
    password: '123',
    tasks: [
      createTask({
        id: 'task-1',
        employeeId: 1,
        title: 'Design Login Page',
        description: 'Create a responsive login page UI for the employee experience.',
        priority: 'high',
        dueDate: '2026-06-17',
        status: 'pending',
        category: 'Design',
      }),
      createTask({
        id: 'task-2',
        employeeId: 1,
        title: 'Fix Navbar',
        description: 'Resolve navbar alignment issues across the dashboard layout.',
        priority: 'medium',
        dueDate: '2026-06-14',
        status: 'completed',
        category: 'Frontend',
        completedAt: '2026-06-15T10:00:00.000Z',
      }),
    ],
  },
  {
    id: 2,
    firstName: 'Vivaan',
    email: 'employee2@example.com',
    password: '123',
    tasks: [
      createTask({
        id: 'task-3',
        employeeId: 2,
        title: 'Build Dashboard',
        description: 'Create a dashboard overview with summary cards and employee tasks.',
        priority: 'high',
        dueDate: '2026-06-20',
        status: 'pending',
        category: 'Frontend',
      }),
      createTask({
        id: 'task-4',
        employeeId: 2,
        title: 'Fix Footer',
        description: 'Improve footer responsiveness for smaller devices.',
        priority: 'medium',
        dueDate: '2026-06-15',
        status: 'completed',
        category: 'Frontend',
        completedAt: '2026-06-16T09:00:00.000Z',
      }),
      createTask({
        id: 'task-5',
        employeeId: 2,
        title: 'Profile Page',
        description: 'Create a dedicated employee profile page with personal details.',
        priority: 'medium',
        dueDate: '2026-06-22',
        status: 'pending',
        category: 'React',
      }),
    ],
  },
  {
    id: 3,
    firstName: 'Aditya',
    email: 'employee3@example.com',
    password: '123',
    tasks: [
      createTask({
        id: 'task-6',
        employeeId: 3,
        title: 'Implement Context API',
        description: 'Create and share global user data using React context patterns.',
        priority: 'high',
        dueDate: '2026-06-18',
        status: 'pending',
        category: 'React',
      }),
      createTask({
        id: 'task-7',
        employeeId: 3,
        title: 'Setup Tailwind',
        description: 'Install and configure Tailwind for design consistency across the app.',
        priority: 'medium',
        dueDate: '2026-06-12',
        status: 'completed',
        category: 'Setup',
        completedAt: '2026-06-13T14:30:00.000Z',
      }),
      createTask({
        id: 'task-8',
        employeeId: 3,
        title: 'Dark Mode',
        description: 'Add dark mode support with a clean toggle and proper contrast.',
        priority: 'medium',
        dueDate: '2026-06-10',
        status: 'failed',
        category: 'UI',
        failedAt: '2026-06-11T08:15:00.000Z',
      }),
    ],
  },
  {
    id: 4,
    firstName: 'Ishaan',
    email: 'employee4@example.com',
    password: '123',
    tasks: [
      createTask({
        id: 'task-9',
        employeeId: 4,
        title: 'Create Login UI',
        description: 'Design a polished login page with accessibility and responsiveness in mind.',
        priority: 'high',
        dueDate: '2026-06-21',
        status: 'pending',
        category: 'Design',
      }),
      createTask({
        id: 'task-10',
        employeeId: 4,
        title: 'Employee Cards',
        description: 'Create summary cards to display employee workload and progress.',
        priority: 'medium',
        dueDate: '2026-06-19',
        status: 'pending',
        category: 'Frontend',
      }),
      createTask({
        id: 'task-11',
        employeeId: 4,
        title: 'Navbar',
        description: 'Create a responsive navigation bar that works on desktop and mobile.',
        priority: 'medium',
        dueDate: '2026-06-11',
        status: 'completed',
        category: 'Frontend',
        completedAt: '2026-06-12T11:45:00.000Z',
      }),
    ],
  },
]

const admin = [{
  id: 1,
  firstName: 'Darsh',
  email: 'admin@example.com',
  password: '123',
}]

export const setLocalStorage = () => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(syncEmployeeTaskStats(employees)))
  }

  if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify(admin))
  }
}

export const getLocalStorage = () => {
  const employee = syncEmployeeTaskStats(JSON.parse(localStorage.getItem('employees') || '[]'))
  const adminData = JSON.parse(localStorage.getItem('admin') || '[]')

  return {
    employee,
    admin: adminData,
  }
}