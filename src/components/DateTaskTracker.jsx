import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const DateTaskTracker = ({ title, initialData }) => {
  const [data, setData] = useState(initialData || []);

  const addNewDate = () => {
    setData([...data, { date: new Date().toISOString().substring(0, 10), tasks: [] }]);
  };

  const addTask = (index) => {
    const updatedData = [...data];
    updatedData[index].tasks.push({ name: '', duration: 0 });
    setData(updatedData);
  };

  const handleDateChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].date = value;
    setData(updatedData);
  };

  const handleTaskChange = (dateIndex, taskIndex, field, value) => {
    const updatedData = [...data];
    updatedData[dateIndex].tasks[taskIndex][field] = value;
    setData(updatedData);
  };

  const removeTask = (dateIndex, taskIndex) => {
    const updatedData = [...data];
    updatedData[dateIndex].tasks.splice(taskIndex, 1);
    setData(updatedData);
  };

  const removeDate = (dateIndex) => {
    const updatedData = [...data];
    updatedData.splice(dateIndex, 1);
    setData(updatedData);
  };

  return (
    <div className="section max-w-5xl mx-auto p-10 bg-gray-900 shadow-lg rounded-lg text-gray-100">
      <h2 className="text-4xl font-bold mb-10 text-gray-100 text-center">{title}</h2>
      {data.map((row, dateIndex) => (
        <div key={dateIndex} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <label className="block text-lg font-semibold text-gray-300">Date:</label>
            <input
              type="date"
              value={row.date}
              onChange={(e) => handleDateChange(dateIndex, e.target.value)}
              className="p-3 bg-gray-700 text-gray-200 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              onClick={() => removeDate(dateIndex)}
              className="ml-4 text-red-400 hover:text-red-600 transition duration-300"
            >
              <FaTrash className="w-6 h-6" />
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-400 mb-4">Tasks:</h3>
          {row.tasks.map((task, taskIndex) => (
            <div key={taskIndex} className="flex mb-4 items-center">
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleTaskChange(dateIndex, taskIndex, 'name', e.target.value)}
                placeholder="Task Name"
                className="flex-1 p-3 mr-2 bg-gray-700 text-gray-200 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <input
                type="number"
                value={task.duration}
                onChange={(e) => handleTaskChange(dateIndex, taskIndex, 'duration', e.target.value)}
                placeholder="Duration (minutes)"
                className="flex-1 p-3 bg-gray-700 text-gray-200 rounded-lg border-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                onClick={() => removeTask(dateIndex, taskIndex)}
                className="ml-4 text-red-400 hover:text-red-600 transition duration-300"
              >
                <FaTrash className="w-6 h-6" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addTask(dateIndex)}
            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition duration-300 w-full"
          >
            Add Task
          </button>
        </div>
      ))}
      <button
        onClick={addNewDate}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 w-full mt-8"
      >
        Add New Date
      </button>
    </div>
  );
};

export default DateTaskTracker;
