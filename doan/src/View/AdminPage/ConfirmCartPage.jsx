import { Button, Tabs } from "antd";
import React, { useEffect } from "react";
import AllBillPageAdmin from "./AllBillPageAdmin";
import BillCompleteAdmin from "./BillCompleteAdmin";
import BillDenieAcceptAdmin from "./BillDenieAcceptAdmin";
import BillTraverPage from "./BillTraverPage";
import BillWaitAcceptAdmin from "./BillWaitAcceptAdmin";
import { useSelector } from "react-redux";
import { stateGlobal } from "../../Reducer/GlobalReducer/GlobalReducer";
import AuthPage from "../AppPage/AuthPage/AuthPage";
import { useHistory } from "react-router-dom";


export default function ConfirmCartPage(props) {

    useEffect(() => {
        document.title = "Xác nhận đơn hàng"
    }, [])
    const { userInfo } = useSelector(stateGlobal)
    const history = useHistory()

    const { TabPane } = Tabs;
    return (
        userInfo.position === "1" ? (
            <div className="web-laptop-profile-col2-title" style={{ borderBottom: 'none' }}>
                {/* 
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                /> */}

                <Tabs
                    defaultActiveKey="1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                    className="web-laptop-tab-confirm-page"
                    type="card"
                >
                    <TabPane
                        tab="Tất cả" key="1" style={{ width: "(100/5)%" }}
                    >
                        <AllBillPageAdmin />
                    </TabPane>

                    <TabPane
                        tab="Đơn hàng cần xác nhận" key="2" style={{ width: "(100/5)%" }}>
                        <BillWaitAcceptAdmin />
                    </TabPane>

                    <TabPane
                        tab="Đơn hàng đã hủy xác nhận" key="3" style={{ width: "(100/5)%" }}>
                        <BillDenieAcceptAdmin />
                    </TabPane>

                    <TabPane
                        tab="Đang giao" key="4" style={{ width: "(100/5)%" }}>
                        <BillTraverPage />
                    </TabPane>

                    <TabPane
                        tab="Hoàn thành" key="5" style={{ width: "(100/5)%" }}>
                        <BillCompleteAdmin />
                    </TabPane>
                </Tabs>
            </div>
        ) : (
            <div className="justify-content-center align-content-center"
                style={{
                    position: "relative",
                    margin: "0 auto",
                }}>
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
                        <p className="h2">401</p>
                        <p className="h2">
                            Bạn không đủ quyền để sử dụng trang hiện tại
                        </p>
                        <Button
                            type="primary"
                            onClick={() => {
                                history.push("/");
                            }}
                            danger
                            style={{
                                borderRadius: 8,
                                width: 150,
                                height: 40,
                            }}
                        >
                            Về trang chủ
                        </Button>
                    </div>
                </div>
            </div>
        )
    )
}