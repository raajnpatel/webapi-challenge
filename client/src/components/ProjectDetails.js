import React from 'react';


const ProjectsDetails = ({ project, deleteProject, editProject}) => {
    return (
        <div>
            <h4>ID: {project.id}</h4>
            <h2>Name: {project.name}</h2>
            <h3>Description: {project.description}</h3>
            <p>Actions: {project.actions}</p>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
            <button onClick={() => editProject(project.id)}>Edit</button>
        </div>
    )
};

export default ProjectsDetails;