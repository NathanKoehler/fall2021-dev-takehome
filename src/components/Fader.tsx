import React, {useState, useEffect } from 'react'
import "./TodoList.css";

export default function Fader(props: any) {
    let activate = true; // will try to make the reverse animation as well
    const delay = props.delay;
    const fadeIn = props.state;
    const [fadeProp, setFadeProp] = useState({
        // fade delay is for keeping elements invisible at the initial render
        // elements will be changed later in the useEffect
        fade: (fadeIn ? "fade out" : "fade delay"), 
    });
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (fadeIn) { // Allows parents to control the fade properties
                setFadeProp({fade: 'fade in'});
            } else {
                setFadeProp({fade: 'fade out'});
            }
            
        }, (fadeIn ? delay : 0)); // makes sure there is no delay on fade out
        return () => clearTimeout(timeout);
    }, [delay, fadeIn, activate]); // fadeIn allows outside communication
    
    return (
        <section className={fadeProp.fade}>
            {props.content}
        </section>
    )
}

Fader.defaultProps = {
    state: true,
    delay: 0
}