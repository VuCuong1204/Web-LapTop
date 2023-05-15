import React from "react";
import { useSelector } from "react-redux";
import { RingLoader, ScaleLoader } from "react-spinners";
import { stateLoadingPage } from "../../../Reducer/LoadingReducer/LoadingPageReducer";

export default function LoadingPage(props) {
    const { loading } = useSelector(stateLoadingPage)
    return (
        <div className="loading">
            <RingLoader
                loading={loading}
                color="#cd1818"
                cssOverride={{
                    position: "absolute",
                    top: "40%",
                    left: "45%"
                }}
                size={150}
            />
        </div>
    )
}