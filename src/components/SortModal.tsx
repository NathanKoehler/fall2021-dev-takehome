import React, { useState } from 'react';
import "./SortModal.css";

export default function SortModal(props: {sortManager:(a:boolean, b:boolean, c:string) => void}) {
    const [sorting, setSorting] = useState<any[]>([false, false, ""]);

    const changeManager = (sortDate: boolean, sortCompleted: boolean, sortTag:string) => {
        setSorting([sortDate, sortCompleted, sortTag]);
        props.sortManager(sortDate, sortCompleted, sortTag);
    }

    return (
        <section>
            <div className="sort-wrapper">
                <h4>Sort by date</h4>
                <div className="toggle-wrapper">
                    <div className="toggle">
                        <input onChange={() => changeManager(!sorting[0], sorting[1], sorting[2])} type="checkbox" />
                        <label />
                    </div>
                </div>
                <h4>Sort by completed</h4>
                <div className="toggle-wrapper">
                    <div className="toggle">
                        <input onChange={() => changeManager(sorting[0], !sorting[1], sorting[2])} type="checkbox" />
                        <label />
                    </div>
                </div>
                <h4>Sort by tag:</h4>
                <div className="line-wrapper">
                    <input onChange={(e) => changeManager(sorting[0], sorting[1], e.target.value)} type="input" />
                </div>
            </div>
        </section>
    )
}
