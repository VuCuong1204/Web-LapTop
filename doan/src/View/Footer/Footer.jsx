import React from "react";
import { nameGroup1, nameTeacher1 } from "../../Template/systemConfig";

export default function Footer(props) {
    return (
        <div className="pt-5 web-laptop-footer">
            <div className="web-laptop-footer-content">
                <div className="text-xl-center">
                    <h1 className="text-white mb-2">{nameGroup1}</h1>
                    <h1 className="text-white mb-3">{nameTeacher1}</h1>
                </div>
                <div className="mt-2 text-xl-center ">
                    <div className="d-flex">
                        <div className="web-laptop-footer-content-name">
                            <span className="text-white">Họ và tên</span>
                        </div>
                        <div className="web-laptop-footer-content-id">
                            <span className="text-white">Mã số sinh viên</span>
                        </div>
                        <div className="web-laptop-footer-content-class">
                            <span className="text-white">Lớp</span>
                        </div>
                        <div className="web-laptop-footer-content-position">
                            <span className="text-white">Chức vụ</span>
                        </div>
                        <div className="web-laptop-footer-content-misson">
                            <span className="text-white">Nhiệm vụ</span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="web-laptop-footer-content-name">
                            <span className="text-white">Vũ Tấn Minh</span>
                        </div>
                        <div className="web-laptop-footer-content-id">
                            <span className="text-white">137664</span>
                        </div>
                        <div className="web-laptop-footer-content-class">
                            <span className="text-white">64PM1</span>
                        </div>
                        <div className="web-laptop-footer-content-position">
                            <span className="text-white">Nhóm trưởng</span>
                        </div>
                        <div className="web-laptop-footer-content-misson">
                            <span className="text-white">Code FE</span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="web-laptop-footer-content-name">
                            <span className="text-white">Vũ Quốc Cường</span>
                        </div>
                        <div className="web-laptop-footer-content-id">
                            <span className="text-white">30464</span>
                        </div>
                        <div className="web-laptop-footer-content-class">
                            <span className="text-white">64PM1</span>
                        </div>
                        <div className="web-laptop-footer-content-position">
                            <span className="text-white">Thành viên</span>
                        </div>
                        <div className="web-laptop-footer-content-misson">
                            <span className="text-white">Code BE</span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="web-laptop-footer-content-name">
                            <span className="text-white">Nguyễn Tiến Dũng</span>
                        </div>
                        <div className="web-laptop-footer-content-id">
                            <span className="text-white">35564</span>
                        </div>
                        <div className="web-laptop-footer-content-class">
                            <span className="text-white">64PM1</span>
                        </div>
                        <div className="web-laptop-footer-content-position">
                            <span className="text-white">Thành viên</span>
                        </div>
                        <div className="web-laptop-footer-content-misson">
                            <span className="text-white">Code FE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}