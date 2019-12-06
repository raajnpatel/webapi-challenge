import React from 'react';


const ProjectsCard = ({ project, deleteProject, editProject}) => {
    return (
        <div>
            <h4>ID: {project.id}</h4>
            <h2>Name: {project.name}</h2>
            <h3>Description: {project.description}</h3>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
            <button onClick={() => editProject(project.id)}>Edit</button>
        </div>
    )
};

export default ProjectsCard;