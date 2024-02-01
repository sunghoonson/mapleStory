import React from 'react';
import { useDispatch } from 'react-redux';
import './css/HyperStatModalComponent.css?after';
import { HyperStatModalProps } from './types';
import { closeModal } from '../features/myModalSlice.ts';

// 하이퍼스탯 모달 컴포넌트
export function HyperStatModal({ data }: HyperStatModalProps) {
console.log(data)
const dispatch = useDispatch();
const handleClose = () => {
  dispatch(closeModal({modalName: 'hyperstatmodal'}));
};
return (
    <div className="hyperstat-modal">
       <div className="hyperstat-header">
            <div className="hyperstatmodaltext-info">Hyper Stat</div>
            <div><button onClick={handleClose}>X</button></div>
          </div>
    </div>
  );
}

