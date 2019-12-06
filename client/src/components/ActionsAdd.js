import React, { useState } from 'react';

const ActionsAdd = ({submitAction}) => {
    const [action, setAction] = useState( {project_id: null, name: "", description: ""});
    const handleChange = e => setAction({...action, [e.target.name]: e.target.value});
    const handleSubmit = e => {
        e.preventDefault();
        submitAction(action);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name = "project_id"
                placeholder="project_id"
                value={action.project_id}
                onChange={handleChange}
            />
            <input
                name = "name"
                placeholder="name"
                value={action.name}
                onChange={handleChange}
            />
            <input
                name = "description"
                placeholder="description"
                value={action.description}
                onChange={handleChange}
            />
            <button type="submit">Add Action</button>
        </form>
    );
};

export default ActionsAdd;