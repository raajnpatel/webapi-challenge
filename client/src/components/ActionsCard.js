import React from 'react';

const ActionsCard = ({ action, deleteAction, editAction}) => {
    return (
        <div>
            Project_ID: {action.project_id} Description: {action.description} Notes: {action.notes}
            <button onClick={() => deleteAction(action.id)}>Delete</button>
            <button onClick={() => editAction(action.id)}>Edit</button>
        </div>
    )
};

export default ActionsCard;

