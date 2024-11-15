import React, { useState, useEffect } from 'react';
import { Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('calendarTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
    setSelectedDate(dateString);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && task) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedDate]: [...(prevTasks[selectedDate] || []), { text: task, completed: false }],
      }));
      setTask('');
    }
  };

  const handleEditTask = (index) => {
    if (tasks[selectedDate] && tasks[selectedDate][index]) {
      setEditingTask(tasks[selectedDate][index].text);
      setEditIndex(index);
    }
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (selectedDate && editingTask) {
      const updatedTasks = [...(tasks[selectedDate] || [])];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], text: editingTask };
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedDate]: updatedTasks,
      }));
      setEditingTask('');
      setEditIndex(null);
    }
  };

  const handleRemoveTask = (index) => {
    if (tasks[selectedDate]) {
      const updatedTasks = tasks[selectedDate].filter((_, i) => i !== index);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedDate]: updatedTasks,
      }));
    }
  };

  const handleToggleTaskCompletion = (index) => {
    if (tasks[selectedDate]) {
      const updatedTasks = [...tasks[selectedDate]];
      updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedDate]: updatedTasks,
      }));
    }
  };

  const renderDaysInMonth = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="border border-gray-200 dark:border-gray-700 p-2 text-center"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      const isSelected = selectedDate === new Date(year, month, day).toDateString();
      const hasTask = tasks[new Date(year, month, day).toDateString()]?.length > 0;
      days.push(
        <div
          key={day}
          className={`border p-2 text-center cursor-pointer transition-all duration-200
            border-gray-200 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900
            ${isToday ? 'bg-yellow-200 dark:bg-yellow-700 font-bold' : ''}
            ${isSelected ? 'bg-indigo-200 dark:bg-indigo-700 font-semibold' : ''}
            ${hasTask ? 'border-indigo-500 dark:border-indigo-400 border-2' : ''}
          `}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {tasks[new Date(year, month, day).toDateString()] && (
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              {tasks[new Date(year, month, day).toDateString()].map((t, index) => (
                <div key={index} className="flex justify-between items-center group bg-white dark:bg-gray-800 rounded-md p-1 mb-1 shadow-sm">
                  <span className={`truncate ${t.completed ? 'line-through' : ''}`}>{t.text}</span>
                  <div className="invisible group-hover:visible flex space-x-1">
                    <button onClick={() => handleToggleTaskCompletion(index)} className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                      {t.completed ? '✓' : '○'}
                    </button>
                    <button onClick={() => handleEditTask(index)} className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <Edit className="h-3 w-3" />
                    </button>
                    <button onClick={() => handleRemoveTask(index)} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      <Trash className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="border rounded-lg p-6 shadow-lg bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevMonth} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-bold text-center text-indigo-600 dark:text-indigo-300">{day}</div>
        ))}
        {renderDaysInMonth()}
      </div>
      {selectedDate && (
        <form onSubmit={editIndex !== null ? handleUpdateTask : handleTaskSubmit} className="mt-6">
          <input
            type="text"
            value={editIndex !== null ? editingTask : task}
            onChange={(e) => editIndex !== null ? setEditingTask(e.target.value) : setTask(e.target.value)}
            placeholder="Enter task"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="mt-2 p-2 rounded-md w-full transition-colors duration-200 bg-indigo-500 dark:bg-indigo-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            {editIndex !== null ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Calendar;
