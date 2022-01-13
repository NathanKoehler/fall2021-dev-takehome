import React, { useEffect, useState } from "react";
import Tag from "./Tag";

interface TagTitle {
	titles: string[];
	removeTag: (n: string) => any;
}

function Tags(props: TagTitle) {

	return (
		<div className="tags-wrapper">
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
