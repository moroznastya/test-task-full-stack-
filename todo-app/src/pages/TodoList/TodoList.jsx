import React, { useState, useEffect } from 'react';
import TodoItem from '../../components/TodoItem';
import './TodoList.css';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [error, setError] = useState(''); //стан для помилок

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/tasks', { 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Не вдалося отримати задачі');
                }

                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError('Помилка отримання задач');
                console.error(err);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        if (newTaskName.trim() !== '') {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/tasks', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ title: newTaskName, description: newTaskDescription, status: 'todo' }),  //Статус по замовчуванню
                });

                if (!response.ok) {
                    throw new Error('Не вдалося створити задачу');
                }

                const newTask = await response.json();
                setTasks([...tasks, newTask]);
                setNewTaskName('');
                setNewTaskDescription('');
            } catch (err) {
                setError('Помилка створення задачі');
                console.error(err);
            }
        }
    };

    const handleUpdateTask = async (taskId, updatedTask) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error('Не вдалося оновити задачу');
            }

            const updatedTaskFromServer = await response.json();
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? updatedTaskFromServer : task 
            );
            setTasks(updatedTasks);
        } catch (err) {
            setError('Помилка оновлення задачі');
            console.error(err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, { 
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Не вдалося видалити задачу');
            }

            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            setError('Помилка видалення задачі');
            console.error(err);
        }
    };

    const filteredTasks = filterStatus === 'all'
        ? tasks
        : tasks.filter(task => task.status === filterStatus);

    return (
        <div className='background-todo'>
        <div className="todo-list-container">
            <h2>My Tasks</h2>
            {error && <p className="error">{error}</p>} {/* Виводимо повідомлення про помилку */}
            <div className="add-task-form">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="filter-options">
                <button onClick={() => setFilterStatus('all')}>All</button>
                <button onClick={() => setFilterStatus('todo')}>Todo</button>
                <button onClick={() => setFilterStatus('in progress')}>In Progress</button>
                <button onClick={() => setFilterStatus('done')}>Done</button>
            </div>
            <ul className="task-list">
                {filteredTasks.map(task => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                    />
                ))}
            </ul>
        </div>
        </div>
    );
}

export default TodoList;