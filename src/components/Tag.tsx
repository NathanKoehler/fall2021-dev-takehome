import React from "react";
import "./Todo.css";

function Tag({ title, removeTag }: { title: string, removeTag: any }) {
    const handleRemoveTag = (e: React.MouseEvent) => {
        e.preventDefault();
        removeTag(title);
    }

	return (
		<div className="tag-wrapper">
			<p className="tag-title">{title}&nbsp;</p>
			<button className="tag-button" onClick={handleRemoveTag}><i className="fas fa-times"></i></button>
		</div>
	);
}

export default Tag;
