import React, { useState } from "react";
import Tags from "./Tags";

export default function TodoModal(props: any) {
	const [name, setName] = useState("");
    const [currTag, setCurrTag] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [date, setDate] = useState("");

    const removeTag = (removedTag:string) => {
        const updatedTags = [...tags].filter(title => (title !== removedTag));
        setTags(updatedTags);
    }

    const submitTag = (e: React.MouseEvent) => {
		e.preventDefault();

        if (currTag && !tags.find(elem => elem === currTag)) {
            setTags([currTag, ...tags]);
        }
        setCurrTag("");
	};

	const submitTodo = (e: React.MouseEvent) => {
		e.preventDefault();
        
		props.submit({
			title: name,
			dueDate: date,
			tagList: tags,
			completed: false,
		});
        setTags([]);
        setCurrTag("");
        setName("");
        setDate("");
	};

	return (
		<form>
			<h3>Name</h3>
			<input
				type="text"
				placeholder="What's up doc?"
				value={name}
                onChange={(e) => setName(e.target.value)}
				className="name-box"
			></input>
			<h3>Tags</h3>
			<input
				type="text"
				placeholder="Ex: Grocery, School, ..."
				value={currTag}
                onChange={(e) => setCurrTag(e.target.value)}
				className="tags-box"
			></input>
			<button onClick={submitTag} className="tag-button">Create tag</button>
            <Tags titles={tags} removeTag={removeTag} />
			<h3>Due Date</h3>
			<input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				className="date-box"
			></input>
			<button onClick={submitTodo} className="name-button">
				Create
			</button>
		</form>
	);
}
