import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <li data-reveal="bottom" className="project-card-item">
            <div className="project-card modern-card">
                <figure className="card-banner">
                    <img 
                        src={project.image} 
                        alt={project.alt || project.title} 
                        width="500" 
                        height="320" 
                        loading="lazy" 
                        decoding="async" 
                    />
                    <div className="card-badge-row">
                        <span className="project-tag">{project.tag}</span>
                        {project.featured && (
                            <span className="featured-badge" title="Featured Project">
                                <i className="ri-flashlight-fill"></i> Featured
                            </span>
                        )}
                    </div>
                </figure>

                <div className="card-content-body">
                    <div className="card-meta">
                        <time className="publish-date" dateTime={project.datetime}>
                            <i className="ri-calendar-line"></i> {project.date}
                        </time>
                    </div>

                    <h3 className="h4 card-title">{project.title}</h3>
                    
                    {project.description && (
                        <p className="card-description">{project.description}</p>
                    )}

                    {project.techStack && project.techStack.length > 0 && (
                        <div className="tech-pill-list">
                            {project.techStack.map((tech, idx) => (
                                <span key={idx} className="tech-pill">{tech}</span>
                            ))}
                        </div>
                    )}

                    <div className="card-actions-row">
                        {project.url && (
                            <a 
                                href={project.url} 
                                target={project.isExternal ? "_blank" : "_self"} 
                                rel={project.isExternal ? "noopener noreferrer" : ""} 
                                className="btn btn-sm btn-primary"
                                title={`View ${project.title}`}
                            >
                                <span>{project.isExternal ? "Live Demo" : "Explore"}</span>
                                <i className={project.isExternal ? "ri-external-link-line" : "ri-arrow-right-line"}></i>
                            </a>
                        )}

                        {project.githubUrl && (
                            <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-sm btn-outline-icon"
                                title="View GitHub Source"
                                aria-label="GitHub Profile"
                            >
                                <i className="ri-github-fill"></i>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ProjectCard;
