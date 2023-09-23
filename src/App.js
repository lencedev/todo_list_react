import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  }, [])

  function addTask(name) {
    setTasks(prev => {
      return [...prev, { name: name, done: false }];
    });
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;

    if (percentage === 0) {
      return "Start with a task 📝";
    } else if (percentage <= 10) {
      return "Good start 🚀";
    } else if (percentage <= 20) {
      return "Making some progress 👟";
    } else if (percentage <= 30) {
      return "Almost a third done 🌄";
    } else if (percentage <= 40) {
      return "Keep on moving 🏃";
    } else if (percentage >= 50 && percentage <= 52) {
      return "Halfway done! 🌗";
    } else if (percentage <= 60) {
      return "Over the halfway mark 🌖";
    } else if (percentage <= 70) {
      return "Entering the final stretch 🚴";
    } else if (percentage <= 80) {
      return "Almost there! 🏁";
    } else if (percentage <= 90) {
      return "Just a bit more! 🏋️‍♂️";
    } else if (percentage < 100) {
      return "Finish line in sight! 🏆";
    } else {
      return "All tasks completed! 🎉";
    }
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return [...prev];
    })
  }

  return (
    <main>
      <h1>{numberComplete}/ {numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task {...task}
          onRename={newName => renameTask(index, newName)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;
