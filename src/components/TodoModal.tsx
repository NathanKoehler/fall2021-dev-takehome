import React, { useState } from "react";
import Tags from "./Tags";
import "./TodoModal.css";

export default function TodoModal(props: any) {
  const [name, setName] = useState(props.current ? props.current.title : '');
  const [currTag, setCurrTag] = useState("");
  const [canSubmit, setCanSubmit] = useState<boolean[]>(
    props.current ? [true, true] : [false, false]
  );
  const [tags, setTags] = useState<string[]>( // if this is an edit modal, properities need to be taken from old tasks
    props.current ? props.current.tagList : []
  );
  const [date, setDate] = useState(props.current ? props.current.dueDate : "");
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
    /* We want to have the keys equal the value plus date, if user tries to make 
    a duplicate we will test for it AFTER they hit the submit button, then which
    if the duplicate task is marked as completed we will uncomplete it OR do
    nothing, then afterr both we will throw out the task */
    hash += new Date(date).getTime();
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

    console.log(taskKey);

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
    setDateInputType("text");
    setCanSubmit([false, false]);
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
          <p className="create-tag-text">
            Create tag <i className="fas fa-pen"></i>
          </p>
        </button>
      </div>
      <Tags titles={tags} removeTag={removeTag} />
      <div className="textbox-wrapper date">
        <input
          type={dateInputType}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            // tests for an issue of tabbing causing the text and date to overlap
            if (e.target.value.length > 0) {
              if (!isNaN(new Date(e.target.value).getDate())) {
                // tests if date is valid
                setCanSubmit([canSubmit[0], true]);
              }
            } else {
              setCanSubmit([canSubmit[0], false]);
            }
          }}
          className="textbox-date"
          onFocus={() => setDateInputType("date")}
          // this ensures that the text input and date input never overlap
          onBlur={canSubmit[1] ? undefined : () => setDateInputType("text")}
          required // enables the animation for the description of each line
        ></input>
        <label>Due Date</label>
      </div>
      <input
        type="submit"
        onClick={submitTodo}
        className={
          // ensures that conditions are met before allowing submission with CSS
          canSubmit[0] && canSubmit[1]
            ? "text-btn submit"
            : "text-btn disabled submit"
        }
        value={props.current ? "Edit" : "Create"}
      ></input>
    </form>
  );
}
