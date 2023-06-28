import React, { useEffect } from "react";
import AllBillPage from "./AllBillPage";
import WaitPaymentBillPage from "./WaitPaymentBillPage";
import WaitAcceptBillPage from "./WaitAcceptBillPage";
import CompleteBillPage from "./CompleteBillPage";
import CancelBillPage from "./CancelBillPage";
import { Tabs } from "antd";
import ShipBillPage from "./ShipBillPage";

export default function BillPage(props) {


    useEffect(() => {
        document.title = "Đơn mua"
    }, [])

    const { TabPane } = Tabs;

    return (
        <>
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
                        <AllBillPage />
                    </TabPane>

                    <TabPane
                        tab="Chờ xác nhận đơn" key="2" style={{ width: "(100/5)%" }}>
                        <WaitAcceptBillPage />
                    </TabPane>

                    <TabPane
                        tab="Đang giao" key="3" style={{ width: "(100/5)%" }}>
                        <ShipBillPage />
                    </TabPane>

                    <TabPane
                        tab='Đơn đã hoàn thành' key="4" style={{ width: "(100/5)%" }}>
                        <CompleteBillPage />
                    </TabPane>

                    <TabPane
                        tab="Đơn đã hủy" key="5" style={{ width: "(100/5)%" }}>
                        <CancelBillPage />
                    </TabPane>

                </Tabs>

            </div>
        </>
    )
}