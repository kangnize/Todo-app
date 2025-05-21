// src/utils.js

/**
 * Get the count of tasks by status.
 * @param {Array} tasks - List of task objects.
 * @param {string} status - One of 'todo', 'doing', 'done', or 'all'.
 * @returns {number}
 */
export const getTaskCountByStatus = (tasks, status) => {
  if (status === "all") return tasks.length;
  return tasks.filter(task => task.status === status).length;
};
