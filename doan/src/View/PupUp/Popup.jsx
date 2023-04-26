import { Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction, statePopup } from '../../Reducer/ModalReducer/ModalReducer';

export default function PopUp() {
    const { visiable, title, ModalComponent } = useSelector(statePopup);
    const dispatch = useDispatch()
    return (
        <Modal
            open={visiable}
            title={title}
            width={500}
            height={300}
            onCancel={() => { dispatch(closeModalAction()) }}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            headerStyle={{ className: "pd-5 " }}
        >
            <h1>hello</h1>
            {ModalComponent}
        </Modal>
    )
}