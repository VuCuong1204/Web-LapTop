import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { closeModalAction } from '../../../Reducer/ModalReducer/ModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import province from "../../../Template/AddressJson/province.json"
import district from "../../../Template/AddressJson/district.json"
import ward from "../../../Template/AddressJson/ward.json"
import { REGEX_PHONE_NUMBER_VN } from '../../../Template/Regex';
import * as Yup from "yup";
import { useFormik } from 'formik';
import _ from 'lodash';
import { editAddressAction } from '../../../Reducer/AddressReducer/AddressReducer';
import { stateGlobal } from '../../../Reducer/GlobalReducer/GlobalReducer';

export default function EditAdressPage(props) {
    const dispatch = useDispatch()
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
            addressdetail: null,
        },
    });


    useEffect(() => {
        try {
            const json = JSON.parse(props.AddressForEdit.address)
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
                    districtName = district.find((item) => {
                        return item.id === json.district;
                    }).name;
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
            setState({
                ...state,
                values: {
                    province: json.province,
                    district: json.district,
                    ward: json.ward,
                    provinceName: provinceName,
                    districtName: districtName,
                    wardName: wardName,
                    addressdetail: json.addressdetail,
                },
            });
        } catch (e) {
            setState({
                ...state,
                values: {
                    province: null,
                    district: null,
                    ward: null,
                    provinceName: null,
                    districtName: null,
                    wardName: null,
                    addressdetail: null,
                },
            });
        }
        renderAddress()
    }, [props])



    useEffect(() => {
        const sortProvince = _.sortBy(province, [
            function (o) {
                return o.name;
            },
        ]);
        state.province = sortProvince.map((p) => {
            return { label: p.name, value: p.id };
        });
        setState({ ...state });

        return () => {
            setState({
                ...state,
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
                    addressdetail: null,
                }
            });
        }
    }, []);

    const renderAddress = () => {
        const array = [
            state.values.provinceName,
            state.values.districtName,
            state.values.wardName,
            state.values.addressdetail,
        ];
        const result = array.reduce((prev, current) => {
            return current ? ", " + current + prev : prev;
        }, "");
        return <>{result.substring(1)}</>;
    };

    const formik = useFormik({
        initialValues: {
            fullname: props.AddressForEdit.fullname,
            phone: props.AddressForEdit.phone,
            province: JSON.parse(props.AddressForEdit.address).province,
            district: JSON.parse(props.AddressForEdit.address).district,
            ward: JSON.parse(props.AddressForEdit.address).ward,
            addressdetail: JSON.parse(props.AddressForEdit.address).addressdetail,
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string().required("Không được để trống").nullable(),
            phone: Yup.string().required("Không được để trống").nullable().matches(REGEX_PHONE_NUMBER_VN, "Sai định dạng số điện thoại VN"),
            province: Yup.string().required("Không được để trống").nullable(),
            district: Yup.string().required("Không được để trống").nullable(),
            ward: Yup.string().required("Không được để trống").nullable(),
            addressdetail: Yup.string().required("Không được để trống").nullable(),
        })
        ,
        onSubmit: (values) => {
            const address = {
                addressdetail: values.addressdetail,
                ward: values.ward,
                district: values.district,
                province: values.province,
            }
            let data = new FormData();
            data.append("idAccount", userInfo.id)
            data.append("idAuto", props.AddressForEdit.idAuto)
            data.append("fullname", values.fullname)
            data.append("phone", values.phone)
            data.append("address", JSON.stringify(address))

            dispatch(editAddressAction(data));
        }
    })
    return (
        <>
            <div className="col-12 p-0">
                <div className="row mb-3 p-0">
                    <div className="col-12">
                        <div>
                            <div className="validate-label">
                                <span>
                                    Họ và tên<span className="text-danger"> *</span>
                                </span>
                                {formik.errors.fullname && formik.touched.fullname && (
                                    <span className="text-danger">
                                        {formik.errors.fullname}
                                    </span>
                                )}
                            </div>
                            <Input
                                id="fullname"
                                name="fullname"
                                value={formik.values.fullname}
                                onChange={formik.handleChange}
                                placeholder="Tên người dùng"
                                onBlur={formik.handleBlur}
                                className={
                                    formik.errors.fullname && formik.touched.fullname
                                        ? "error"
                                        : ""
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-3 p-0 ">
                    <div className="col-12">
                        <div>
                            <div className="validate-label">
                                <span>
                                    Số điện thoại<span className="text-danger"> *</span>
                                </span>
                                {formik.errors.phone && formik.touched.phone && (
                                    <span className="text-danger">
                                        {formik.errors.phone}
                                    </span>
                                )}
                            </div>
                            <Input
                                value={formik.values.phone}
                                placeholder="Số điện thoại"
                                id="phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.errors.phone && formik.touched.phone
                                        ? "error"
                                        : ""
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-3 p-0 " >
                    <div className="col-12">
                        <div>
                            <div className="validate-label">
                                <span>
                                    Tỉnh/Thành phố<span className="text-danger"> *</span>
                                </span>
                                {formik.errors.province && formik.touched.province && (
                                    <span className="text-danger">
                                        {formik.errors.province}
                                    </span>
                                )}
                            </div>
                            <Select
                                style={{ width: "100%" }}
                                options={state.province}
                                value={formik.values.province}
                                id="province"
                                showSearch
                                showAction="focus"
                                optionFilterProp={"label"}
                                onChange={(val) => {
                                    const name = state.province.find((item) => {
                                        return item.value === val;
                                    }).label;
                                    const lstDistrict = district
                                        .filter((item) => {
                                            return item.pId === val;
                                        })
                                        .map((d) => {
                                            return { label: d.name, value: d.id };
                                        });
                                    formik.values.province = val
                                    setState({
                                        ...state,
                                        district: _.sortBy(lstDistrict, [
                                            function (o) {
                                                return o.label;
                                            },
                                        ]),
                                        values: {
                                            province: val,
                                            district: null,
                                            ward: null,
                                            provinceName: name,
                                            districtName: null,
                                            wardName: null,
                                        },
                                    });
                                }}
                            ></Select>
                        </div>
                    </div>
                </div>

                <div className="row mb-3 p-0" >
                    <div className="col-12">
                        <div>
                            <div className="validate-label">
                                <span>
                                    Quận/Huyện<span className="text-danger"> *</span>
                                </span>
                                {formik.errors.district && formik.touched.district && (
                                    <span className="text-danger">
                                        {formik.errors.district}
                                    </span>
                                )}
                            </div>
                            <Select
                                showAction="focus"
                                style={{ width: "100%" }}
                                options={state.district}
                                value={formik.values.district}
                                id="district"
                                showSearch
                                optionFilterProp={"label"}
                                onChange={(val) => {
                                    const name = state.district.find((item) => {
                                        return item.value === val;
                                    }).label;
                                    const lstWard = ward
                                        .filter((item) => {
                                            return item.pId === val;
                                        })
                                        .map((d) => {
                                            return { label: d.name, value: d.id };
                                        });
                                    formik.values.district = val
                                    setState({
                                        ...state,
                                        ward: _.sortBy(lstWard, [
                                            function (o) {
                                                return o.label;
                                            },
                                        ]),
                                        values: {
                                            ...state.values,
                                            district: val,
                                            districtName: name,
                                            ward: null,
                                            wardName: null,
                                        },
                                    });
                                }}
                            ></Select>
                        </div>
                    </div>
                </div>

                <div className="row mb-3 p-0 ">
                    <div className="col-12">
                        <div>
                            <div className="validate-label">
                                <span>
                                    Phường xã<span className="text-danger"> *</span>
                                </span>
                                {formik.errors.ward && formik.touched.ward && (
                                    <span className="text-danger">
                                        {formik.errors.ward}
                                    </span>
                                )}
                            </div>
                            <Select
                                showAction="focus"
                                style={{ width: "100%" }}
                                options={state.ward}
                                showSearch
                                id="ward"
                                value={formik.values.ward}
                                optionFilterProp={"label"}
                                onChange={(val) => {
                                    const name = state.ward.find((item) => {
                                        return item.value === val;
                                    }).label;
                                    formik.values.ward = val
                                    setState({
                                        ...state,
                                        values: {
                                            ...state.values,
                                            ward: val,
                                            wardName: name,
                                        },
                                    });
                                }}
                            ></Select>
                        </div>
                    </div>
                </div>

                <div className="row mb-3 p-0 " style={{ marginBottom: 20 }}>
                    <div className="col-12">
                        <div>
                            <div className="validate-label">
                                <span>
                                    Địa chỉ cụ thể<span className="text-danger"> *</span>
                                </span>
                                {formik.errors.addressdetail && formik.touched.addressdetail && (
                                    <span className="text-danger">
                                        {formik.errors.addressdetail}
                                    </span>
                                )}
                            </div>
                            <Input
                                value={formik.values.addressdetail}
                                placeholder="Địa chỉ cụ thể"
                                id="addressdetail"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    setState({
                                        ...state,
                                        values: {
                                            ...state.values,
                                            addressdetail: e.target.value
                                        }
                                    })
                                }}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.errors.addressdetail && formik.touched.addressdetail
                                        ? "error"
                                        : ""
                                }
                            />
                            <div className="mt-2">
                                <i>
                                    <span className="font-weight-bold">Địa chỉ: </span>{" "}
                                    {renderAddress()}
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Button
                    className="cancel mr-3 size-primary"
                    size="middle"
                    onClick={() => {
                        dispatch(closeModalAction())
                    }}
                    style={{ borderRadius: "5px" }}
                >
                    Hủy
                </Button>

                <Button
                    danger
                    type="primary"
                    className="size-primary success"
                    size="middle"
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                    style={{ borderRadius: "5px" }}
                >
                    Cập nhật thông tin
                </Button>

            </div>
        </>
    )
}