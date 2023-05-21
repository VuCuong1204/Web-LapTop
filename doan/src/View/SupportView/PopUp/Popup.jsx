import { Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction, statePopup } from '../../../Reducer/ModalReducer/ModalReducer';

export default function PopUp(props) {
    const { visiable, title, ModalComponent } = useSelector(statePopup);

    const dispatch = useDispatch()


    return (
        <Modal
            open={visiable}
            title={title}
            width={600}
            height={800}
            onCancel={() => { dispatch(closeModalAction()) }}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            headerStyle={{ className: "pd-5 " }}
            destroyOnClose={true}
            maskClosable={false}
        >
            {ModalComponent}
        </Modal>
    )
}