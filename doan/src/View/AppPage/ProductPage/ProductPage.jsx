import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import AuthPage from "../AuthPage/AuthPage";
import Header from "../../Header/Header";
import _ from "lodash";

export default function ProductPage(props) {
    useEffect(() => {
        console.log(props)
        console.log(window.location.pathname)
    }, [])

    const { userInfo } = useSelector(stateGlobal)

    return (
        <>
            <Header />
            <h1>Hello</h1>
            <h2>{props.match.params.id}</h2>
        </>
    )
}