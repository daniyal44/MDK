import React from 'react';

const SkillCard = ({ item }) => {
    return (
        <li>
            <div className="skills-card">
                <div className="tooltip">{item.name}</div>
                <div className="card-icon">
                    <img 
                        src={item.icon} 
                        alt={item.alt || `${item.name} icon`} 
                        width="48" 
                        height="48" 
                        loading="lazy" 
                        decoding="async" 
                    />
                </div>
            </div>
        </li>
    );
};

export default SkillCard;
