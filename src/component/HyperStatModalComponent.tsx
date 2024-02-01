import React from 'react';
import './css/HyperStatModalComponent.css?after';
import { HyperStatModalProps } from './types';

// 하이퍼스탯 모달 컴포넌트
export function HyperStatModal({ data }: HyperStatModalProps) {
console.log(data)
return (
    <div className="hyperstat-modal">
       하이퍼스탯
    </div>
  );
}

