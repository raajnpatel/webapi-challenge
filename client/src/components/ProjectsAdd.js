import React, { useState } from 'react';
import axios from "axios";

const ProjectsAdd = () => {
    const [project, setProject] = useState( {name: "", description: ""});
    const handleChange = e => setProject({...project, [e.target.name]: e.target.value});
    const handleSubmit = e => {
        e.preventDefault();
        editProject();
    };

    const editProject = project => {
        axios
            .put(`http://localhost:4444/api/projects/${project.id}`, project)
            .then(res => console.log(res) || setProject(res.data))
            .catch(err => console.log(err.response));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name = "name"
                placeholder="name"
                value={project.name}
                onChange={handleChange}
            />
            <input
                name = "description"
                placeholder="description"
                value={project.description}
                onChange={handleChange}
            />
            <button type="submit">Add Project</button>
        </form>
    );
};

export default ProjectsAdd;