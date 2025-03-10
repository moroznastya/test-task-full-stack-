import React, { useState } from 'react';

function TodoItem({ task, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);

    const handleSave = () => {
        onUpdate(task.id, { name, description, status });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setName(task.name);
        setDescription(task.description);
        setStatus(task.status);
        setIsEditing(false);
    };

    return (
        <li className="task-item">
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="todo">Todo</option>
                        <option value="in progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div className="view-mode">
                    <div className='view-info'>
                         <h3>{name}</h3>
                    <p>{description}</p>
                    <p>Status: {status}</p>
                    </div>
                    <div>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(task.id)}>Delete</button> 
                    </div>
                   

                </div>
            )}
        </li>
    );
}

export default TodoItem;