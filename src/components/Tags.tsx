import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import "./Todo.css";

interface TagTitle {
	titles: string[];
	removeTag: (n: string) => any;
}

function Tags(props: TagTitle) {

	return (
		<div className="tags-container">
			{props.titles &&
				props.titles.map((title, index) => {
					return (
						<Tag key={index} title={title} removeTag={props.removeTag}></Tag>
					);
				})}
		</div>
	);
}

export default Tags;
