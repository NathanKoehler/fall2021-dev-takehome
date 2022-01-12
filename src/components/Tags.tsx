import React, { useEffect, useState } from "react";
import HashGenerator from "./HashGenerator";
import Tag from "./Tag";

interface TagTitle {
	titles: string[];
	removeTag: (n: string) => any;
}

function Tags(props: TagTitle) {

	return (
		<div className="tags-wrapper">
			{props.titles &&
				props.titles.map((title) => {
					return (
						<Tag key={HashGenerator(title)} title={title} removeTag={props.removeTag}></Tag>
					);
				})}
		</div>
	);
}

export default Tags;
