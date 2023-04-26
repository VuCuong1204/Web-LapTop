import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function Footer(props) {
    let params = new URL(document.location).searchParams;
    let name = params.get("name");
    let age = params.get("age");
    useEffect(() => {
        console.log(name)
        console.log(age)
    })
    return (
        <div>
            <div>
                <h1>Footer</h1>
                <h2>{props.match.params.id}</h2>
            </div>
        </div>
    )
}