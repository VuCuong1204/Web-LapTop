import React, { useEffect } from "react";
import { getListAddressAction, stateAddress } from "../../../Reducer/AddressReducer/AddressReducer";
import { useDispatch, useSelector } from "react-redux";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import province from "../../../Template/AddressJson/province.json"
import district from "../../../Template/AddressJson/district.json"
import ward from "../../../Template/AddressJson/ward.json"
import { Button } from "antd";
import { closeModalAction, openModalAction } from "../../../Reducer/ModalReducer/ModalReducer";
import AddAddressPage from "../AddressPage/AddAddressPage";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { setDefaultAdress } from "../../../Reducer/ProductReducer/ProductReducer";

export default function ChooseAddressPage(props) {

    const { listAddress } = useSelector(stateAddress)
    const dispatch = useDispatch()
    const history = useHistory()
    const { userInfo } = useSelector(stateGlobal)
    useEffect(() => {
        let data = new FormData();
        data.append("idAccount", userInfo.id)
        dispatch(getListAddressAction(data))
    }, [])
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
                if (json.district) {
                    districtName = district.find((item) => {
                        return item.id === json.district;
                    }).name;
                    if (json.ward) {
                        wardName = ward.find((item) => {
                            return item.id === json.ward;
                        }).name;
                    }
                }
            }
            const result = json.addressdetail + "," + wardName + "," + districtName + "," + provinceName
            return <p>{result}</p>;
        } catch (e) {
            return <p>{data.address}</p>
        }

    }
    return <>
        {
            listAddress.length !== 0 ? (
                listAddress.map((item) => (
                    <Button
                        type="link"
                        className="mt-2 list-address-group"
                        onClick={() => {
                            dispatch(setDefaultAdress(item));
                            dispatch(closeModalAction())
                        }}
                    >
                        <div>
                            {item.fullname}
                        </div>
                        <div>
                            {item.phone}
                        </div>
                        <div>
                            {renderAddress(item)}
                        </div>
                    </Button>
                ))
            ) :
                (
                    <></>
                )
        }
        {
            _.isEmpty(userInfo) ? (
                <>
                    <span>Bạn cần {" "}
                        <Button
                            type="link"
                            style={{
                                color: "#cd1818",
                                padding: 0
                            }}
                            onClick={() => {
                                sessionStorage.setItem("pathName", JSON.stringify(window.location.pathname))
                                dispatch(closeModalAction())
                                history.push("/Login")
                            }}
                        >
                            Đăng nhập
                        </Button>
                        {" "}
                        để thêm địa chỉ
                    </span>
                </>
            ) : (<Button
                type="link"
                className="mt-2"
                style={{
                    paddingLeft: 20,
                    color: "#cd1818",
                    border: "1px solid rgba(0,0,0,.20)",
                    height: 40,
                    borderRadius: 8
                }}
                onClick={() => {
                    dispatch(closeModalAction())
                    dispatch(openModalAction({ title: "Thêm địa chỉ", ModalComponent: <AddAddressPage /> }))
                }}>
                Thêm địa chỉ mới
            </Button>)
        }
    </>
}