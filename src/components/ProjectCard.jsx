import React from 'react';

const ProjectCard = ({ project }) => {
    const cardBody = (
        <>
            <figure className="card-banner">
                <img 
                    src={project.image} 
                    alt={project.alt || project.title} 
                    width="500" 
                    height="350" 
                    loading="lazy" 
                    decoding="async" 
                />
            </figure>

            <div className="card-content-overlay">
                <span className="project-tag">{project.tag}</span>
                <h3 className="h4 card-title">{project.title}</h3>
                <time className="publish-date" dateTime={project.datetime}>{project.date}</time>
            </div>
        </>
    );

    return (
        <li data-reveal="bottom">
            {project.url ? (
                <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card"
                    title={`View ${project.title}`}
                >
                    {cardBody}
                </a>
            ) : (
                <div className="project-card">
                    {cardBody}
                </div>
            )}
        </li>
    );
};

export default ProjectCard;
