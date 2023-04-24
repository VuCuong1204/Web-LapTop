import React from "react";

export default function Footer(props) {
    return (
        <div>
            <div>
                <h1>Footer</h1>
                <h2>{props.match.params.id}</h2>
            </div>
        </div>
    )
}