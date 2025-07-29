import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface TaskFormProps {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="relative mb-4"
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full p-3 pl-4 pr-12 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:border-transparent outline-none transition-all"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
          <motion.button
            type="submit"
            disabled={!title.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-1.5 rounded-full ${title.trim() ? 'text-indigo-600 hover:bg-indigo-100' : 'text-gray-400'} transition-colors`}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </motion.button>
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default TaskForm;
