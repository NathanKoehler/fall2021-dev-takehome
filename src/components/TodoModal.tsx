import React, { useState } from "react";
import Tags from "./Tags";
import "./TodoModal.css";

export default function TodoModal(props: any) {
  const [name, setName] = useState(props.current ? props.current.title : "");
  const [currTag, setCurrTag] = useState("");
  const [canSubmit, setCanSubmit] = useState<boolean[]>(props.current ? [true, true] : [false, false]);
  const [tags, setTags] = useState<string[]>( // if this is an edit modal, properities need to be taken from old tasks
    props.current ? props.current.tagList : []
  );
  const [date, setDate] = useState(props.current ? props.current.dueDate : []);
  const [dateInputType, setDateInputType] = useState("text");

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
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.length > 0) {
              setCanSubmit([true, canSubmit[1]]);
            } else {
              setCanSubmit([false, canSubmit[1]]);
            }
          }}
          required // enables the animation for the description of each line
        />
        <label>Task</label>
      </div>
      <div className="textbox-wrapper tags">
        <input
          type="input"
          value={currTag}
          onChange={(e) => setCurrTag(e.target.value)}
          required // enables the animation for the description of each line
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
          onChange={(e) => {
            setDate(e.target.value);
            if (!isNaN(new Date(e.target.value).getDate())) {
              setCanSubmit([canSubmit[0], true]);
            } else {
              setCanSubmit([canSubmit[0], false]);
            }
          }}
          className="textbox-date"
          onFocus={changeDateInput}
          onBlur={changeDateInput}
          required // enables the animation for the description of each line
        ></input>
        <label>Due Date</label>
      </div>
      <input
        type="submit"
        onClick={submitTodo}
        className={(canSubmit[0] && canSubmit[1]) ? "text-btn submit" : "text-btn disabled submit"}
        value={props.current ? "Edit" : "Create"}
      ></input>
    </form>
  );
}
