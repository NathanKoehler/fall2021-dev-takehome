import React from "react";
import "./Task.css";

function Tag({ title, color, removeTag }: { title: string, color: string, removeTag: any }) {
    const handleRemoveTag = (e: React.MouseEvent) => {
        e.preventDefault();
        removeTag(title);
    }

	return (
		<div className="tag-wrapper" style={{backgroundColor: `${color}`}}>
			<p className="tag-title">{title}&nbsp;</p>
			<button className="tag-button" onClick={handleRemoveTag}><i className="fas fa-times"></i></button>
		</div>
	);
}

export default Tag;
