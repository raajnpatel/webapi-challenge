import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ProjectsList from './components/ProjectsList';
import ProjectDetails from './components/ProjectDetails';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={ProjectsList} />
      <Route path="/project/:id" exact component={ProjectDetails} />
    </div>
  );
}

export default App;
