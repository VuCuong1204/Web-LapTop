import { Button, Empty, Popconfirm } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Footer/Footer";
import { openModalAction } from "../../../Reducer/ModalReducer/ModalReducer";
import { deleteAddressAction, editDefaultAddressAction, getListAddressAction, stateAddress } from "../../../Reducer/AddressReducer/AddressReducer";
import { useEffect } from "react";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import AddAddressPage from "./AddAddressPage";
import EditAdressPage from "./EditAddressPage";
import province from "../../../Template/AddressJson/province.json"
import district from "../../../Template/AddressJson/district.json"
import ward from "../../../Template/AddressJson/ward.json"
import { useState } from "react";

export default function AddressPage(props) {
    const dispatch = useDispatch();
    const { listAddress } = useSelector(stateAddress)
    const { userInfo } = useSelector(stateGlobal)
    const [state, setState] = useState({
        province: [],
        district: [],
        ward: [],
        values: {
            province: null,
            district: null,
            ward: null,
            provinceName: null,
            districtName: null,
            wardName: null,
            address: null,
        },
    });
    useEffect(() => {
        let formdata = new URLSearchParams();
        formdata.append("idAccount", userInfo.id);
        dispatch(getListAddressAction(formdata))
    }, [])
    const addAddressForm = () => {
        dispatch(openModalAction({ title: "Thêm mới địa chỉ", ModalComponent: <AddAddressPage /> }))
    }

    const renderAddress = (data) => {
        try {
            const json = JSON.parse(data.address)
            let provinceName = null;
            let districtName = null;
            let wardName = null;
            if (json.province) {
                provinceName = province.find((item) => {
                    return item.id === json.province;
                }).name;
                state.district = district
                    .filter((item) => {
                        return item.pId === json.province;
                    })
                    .map((d) => {
                        return { label: d.name, value: d.id };
                    });
                if (json.district) {
                    // Tìm districtName
                    districtName = district.find((item) => {
                        return item.id === json.district;
                    }).name;
                    // gán list district mới
                    state.ward = ward
                        .filter((item) => {
                            return item.pId === json.district;
                        })
                        .map((d) => {
                            return { label: d.name, value: d.id };
                        });
                    if (json.ward) {
                        wardName = ward.find((item) => {
                            return item.id === json.ward;
                        }).name;
                    }
                }
            }
            const result = json.addressdetail + "," + wardName + "," + districtName + "," + provinceName;
            return <p>{result}</p>;
        } catch (e) {
            return <p>{data.address}</p>
        }

    }
    return (
        <>
            <div className="web-laptop-profile-col2-title" style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h1>Địa chỉ của tôi</h1>
                </div>
                <div>
                    <div className="d-flex justify-content-center">
                        <Button
                            type="primary"
                            danger
                            style={{ height: 40 }}
                            onClick={addAddressForm}
                        >
                            <div className="d-flex justify-content-center">
                                <span class="material-icons">
                                    add
                                </span>
                                Thêm mới địa chỉ
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="web-laptop-profile-col2-address-content" style={{ minHeight: 300 }}>
                {
                    listAddress.length === 0 ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={"Không có dữ liệu"} />
                    ) : (
                        <div>
                            {listAddress.map((item) => (
                                <div className="address-item d-flex">
                                    <div style={{ width: '100%' }}>
                                        <div className="d-flex address-item-heading">
                                            <div className="d-flex address-item-heading-1">
                                                <div>
                                                    <p>{item.fullname}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex address-item-heading-2">
                                                <Button
                                                    type="link"
                                                    className="p-0 mr-2"
                                                    style={{ marginRight: 8 }}
                                                    onClick={() => {
                                                        dispatch(openModalAction({
                                                            title: "Sửa thông tin địa chỉ", ModalComponent: <EditAdressPage
                                                                AddressForEdit={item}
                                                            />
                                                        }))
                                                    }}
                                                >Cập nhật</Button>
                                                {
                                                    item.addresstype !== "1" ? (
                                                        <Popconfirm
                                                            style={{ width: 200, height: 200 }}
                                                            title="Xóa địa chỉ"
                                                            description="Bạn có chắc chắn muốn xóa địa chỉ"
                                                            onConfirm={() => {
                                                                let data = new FormData();
                                                                data.append("idAuto", item.idAuto)
                                                                data.append("idAccount", userInfo.id)
                                                                dispatch(deleteAddressAction(data));
                                                            }}
                                                            // onCancel={}
                                                            okText="Xóa"
                                                            cancelText="Hủy"
                                                        >
                                                            <Button type="link">Xóa</Button>
                                                        </Popconfirm>
                                                    ) : (<></>)
                                                }
                                            </div>
                                        </div>
                                        <div className="d-flex address-item-heading align-items-center">
                                            <div className="d-flex address-item-heading-1">
                                                <div>
                                                    <div>
                                                        <p>{item.phone}</p>
                                                    </div>
                                                    <div>
                                                        {renderAddress(item)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex address-item-heading-2">
                                                {
                                                    item.addresstype !== "1" ? (<Button
                                                        onClick={() => {
                                                            let data = new FormData();
                                                            data.append("idAuto", item.idAuto);
                                                            data.append("idAccount", userInfo.id);
                                                            dispatch(editDefaultAddressAction(data))
                                                        }} >
                                                        Đặt làm mặc định
                                                    </Button>) : (<></>)
                                                }
                                            </div>
                                        </div>
                                        <div className="row-default">
                                            {
                                                item.addresstype === "1" ? (<span>Mặc định</span>) : (<></>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    )
}