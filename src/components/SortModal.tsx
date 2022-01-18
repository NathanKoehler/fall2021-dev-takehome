import React, { useState } from 'react';
import "./SortModal.css";

export default function SortModal(props: {sortManager:(a:boolean, b:boolean) => void}) {
    const [sorting, setSorting] = useState<boolean[]>([false, false]);

    const changeManager = (sortDate: boolean, sortCompleted: boolean) => {
        setSorting([sortDate, sortCompleted]);
        props.sortManager(sortDate, sortCompleted);
    }

    return (
        <section>
            <div className="sort-wrapper">
                <h4>Sort by date</h4>
                <div className="toggle-wrapper">
                    <div className="toggle">
                        <input onChange={() => changeManager(!sorting[0], sorting[1])} type="checkbox" />
                        <label />
                    </div>
                </div>
                <h4>Sort by completed</h4>
                <div className="toggle-wrapper">
                    <div className="toggle">
                        <input onChange={() => changeManager(sorting[0], !sorting[1])} type="checkbox" />
                        <label />
                    </div>
                </div>
            </div>
        </section>
    )
}
