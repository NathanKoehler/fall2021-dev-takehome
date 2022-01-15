import React, { useState } from "react";
import Tags from "./Tags";
import "./TodoModal.css";

export default function TodoModal(props: any) {
  const [name, setName] = useState(props.current ? props.current.title : "");
  const [currTag, setCurrTag] = useState("");
  const [tags, setTags] = useState<string[]>(
    props.current ? props.current.tagList : []
  );
  const [date, setDate] = useState(props.current ? props.current.dueDate : []);

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

  const removeTag = (removedTag: string): void => {
    const updatedTags = [...tags].filter((title) => title !== removedTag);
    setTags(updatedTags);
  };

  const submitTag = (e: React.MouseEvent): void => {
    e.preventDefault();

    if (currTag && !tags.find((elem) => elem === currTag)) {
      setTags([currTag, ...tags]);
    }
    setCurrTag("");
  };

  const submitTodo = (e: React.MouseEvent): void => {
    e.preventDefault();

    let taskKey;

    if (props.current) {
      taskKey = props.current.key;
    } else {
      taskKey = hashString(name);
    }

    props.submit({
      key: taskKey,
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

  const [dateInputType, setDateInputType] = useState("text");

  const changeDateInput = () => {
    if (dateInputType === "text") {
      setDateInputType("date");
    } else {
      setDateInputType("text");
    }
  };

  return (
    <form className="modal-space">
      <div className="textbox-wrapper">
        <input
          type="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Task</label>
      </div>
      <div className="textbox-wrapper tags">
        <input
          type="input"
          value={currTag}
          onChange={(e) => setCurrTag(e.target.value)}
          required
        />
        <label>Tags</label>
        <button onClick={submitTag} className="text-btn">
          <p className="create-tag-text">Create tag <i className="fas fa-pen"></i></p>
        </button>
      </div>
      <Tags titles={tags} removeTag={removeTag} />
      <div className="textbox-wrapper date">
        <input
          type={dateInputType}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="textbox-date"
          onFocus={changeDateInput}
          onBlur={changeDateInput}
          required
        ></input>
        <label>Due Date</label>
      </div>
      <input
        type="submit"
        onClick={submitTodo}
        className="text-btn submit"
        value={props.current ? "Edit" : "Create"}
      ></input>
    </form>
  );
}
