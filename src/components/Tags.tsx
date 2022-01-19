import Tag from "./Tag";
import "./Task.css";
import { TaskTag } from "./TodoList";

interface TagTitle {
	taskTags: TaskTag[];
	removeTag: (n: string) => any;
}

function Tags(props: TagTitle) {
	const hashString = (val: string): number => {
		let hash = 0,
		  i,
		  chr;
		if (val.length === 0) return hash;
		for (i = 0; i < val.length; i++) {
		  chr = val.charCodeAt(i);
		  hash = (hash << 5) - hash + chr;
		  hash |= 0;
		}
		return hash;
	  };

	return (
		<div className="tags-container">
			{props.taskTags &&
				props.taskTags.map((elem) => {
					return (
						<Tag key={hashString(elem.title)} title={elem.title} color={elem.color} removeTag={props.removeTag}></Tag>
					);
				})}
		</div>
	);
}

export default Tags;
