import { motion, AnimatePresence } from 'framer-motion';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle && trimmedTitle !== task.title) {
      onUpdate(task.id, trimmedTitle);
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
      className="group relative px-6 py-4 hover:bg-gray-50 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 mt-1 h-5 w-5 rounded-full border-2 ${task.completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'} flex items-center justify-center transition-colors`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <CheckIcon className="h-3.5 w-3.5 text-white" />
          )}
        </button>

        <div className="ml-3 flex-1 min-w-0">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="flex items-center">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full p-1 border-b border-gray-300 focus:border-indigo-500 focus:outline-none bg-white rounded"
                autoFocus
              />
              <button
                type="submit"
                className="ml-2 text-sm text-indigo-600 hover:text-indigo-800"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditedTitle(task.title);
                  setIsEditing(false);
                }}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="flex items-center">
              <p className={`text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''} break-words`}>
                {task.title}
              </p>
              {task.completedAt && (
                <span className="ml-2 text-xs text-gray-400">
                  {formatDate(task.completedAt)}
                </span>
              )}
            </div>
          )}
        </div>

        <AnimatePresence>
          {isHovered && !isEditing && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center space-x-1 ml-2"
            >
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
                aria-label="Edit task"
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Delete task"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskItem;
