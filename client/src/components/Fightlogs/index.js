import React, { Component } from "react";
import "./style.css";

function FightLogs(props) {
    console.log(props.children)
    return (
        
        props.children.map(log => (
            <p>
                {log}
            </p>
        ))
    )
    // return <h2>something</h2>
}
export default FightLogs;