import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Header/Header";

export default function NoConectionPage(props) {
    const history = useHistory();
    useEffect(() => {
        document.title = "NotFound"
    })
    return (
        <>
            <Header />
            <div
                className="justify-content-center align-content-center"
                style={{
                    height: 600,
                    width: 1200,
                    position: "relative",
                    margin: "0 auto",
                }}
            >
                <div
                    className="justify-content-center"
                    style={{
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        className=""
                        style={{
                            textAlign: "center",
                            height: 300,
                        }}
                    >
                        <div className="web-laptop-page-logo"></div>
                        <p className="h2"></p>
                        <p className="h2">Không có mạng vui lòng kiểm tra lại</p>
                    </div>
                </div>
            </div>
        </>
    );
}
