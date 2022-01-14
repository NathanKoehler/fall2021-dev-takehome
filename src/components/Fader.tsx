import React, {useState, useEffect } from 'react'
import "./TodoList.css";

export default function Fader(props: any) {
    const [fadeProp, setFadeProp] = useState({
        fade: 'fade-in',
    });

    useEffect(() => {
        const timeout = setInterval(() => {
            if (fadeProp.fade === 'fade-in') {
                setFadeProp({fade: 'fade-out'});
            } else {
                setFadeProp({fade: 'fade-in'});
            }
        }, 4000);

        return () => clearInterval(timeout);
    }, [fadeProp]);
    
    return (
        <div className={fadeProp.fade}>
            {...props}
        </div>
    )
}