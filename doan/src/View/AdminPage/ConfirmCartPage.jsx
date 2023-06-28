import { Tabs } from "antd";
import React, { useEffect } from "react";
import AllBillPage from "../AppPage/BillPage/AllBillPage";
import WaitAcceptBillPage from "../AppPage/BillPage/WaitAcceptBillPage";
import AllBillPageAdmin from "./AllBillPageAdmin";
import BillWaitAcceptAdmin from "./BillWaitAcceptAdmin";
import BillDenieAcceptAdmin from "./BillDenieAcceptAdmin";
import BillCompleteAdmin from "./BillCompleteAdmin";
import BillTraverPage from "./BillTraverPage";

export default function ConfirmCartPage(props) {

    useEffect(() => {
        document.title = "Xác nhận đơn hàng"
    }, [])

    const { TabPane } = Tabs;
    return (
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
    )
}