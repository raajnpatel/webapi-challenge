import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectsCard from "./ProjectsCard";
import ProjectsAdd from "./ProjectsAdd";

const ProjectsList = () => {
    const [projectsList, setProjectsList] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:4444/api/projects')
            .then(res => {
                setProjectsList(res.data);
            })
            .catch(err => console.log(err.response));
    });

    const submitProject = project => {
        window.location.reload(true);
        axios
            .post('http://localhost:4444/api/projects', project)
            .then(res => console.log(res) || setProjectsList(res.data))
            .catch(err => console.log(err.response));
    };

    const editProject = project => {
        axios
            .put(`http://localhost:4444/api/projects/${project.id}`, project)
            .then(res => console.log(res) || setProjectsList(res.data))
            .catch(err => console.log(err.response));
    };

    const deleteProject = id => {
        window.location.reload(true);
        axios
            .delete(`http://localhost:4444/api/projects/${id}`)
            .then(res => console.log(res) || setProjectsList(res.data))
            .catch(err => console.log(err.response));
    };

    return (
        <div>
            <ProjectsAdd submitProject={submitProject}/>
            <h2>Projects</h2>
            {projectsList.map(project => {
                return <ProjectsCard key={project.id}
                                     project={project}
                                     deleteProject={deleteProject}
                                     editProject={editProject}
                />
            })}
        </div>
    )
};

export default ProjectsList;