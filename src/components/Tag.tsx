import React from "react";

function Tag({ title, removeTag }: { title: string, removeTag: any }) {
    const handleRemoveTag = (e: React.MouseEvent) => {
        e.preventDefault();
        removeTag(title);
    }

	return (
		<div className="tag-wrapper">
			<p className="tag-title">{title}</p>
			<button onClick={handleRemoveTag}>x</button>
		</div>
	);
}

export default Tag;
