import React from 'react';

function Tooltip({ tooltip, posX, posY }) {
  // 값이 0, null, 또는 undefined가 아닌지 확인하는 함수
  const shouldRender = value => {
    return value !== null && value !== undefined && value !== '0';
  };

  return (
    <div
      className="tooltip"
      style={{
        left: posX + 'px',
        top: (posY + 15) + 'px'
      }}
    >
      {shouldRender(tooltip.starforce) && <div style={{color:'yellow'}}>{tooltip.starforce}성</div>}
      {<div style={{color:'pink'}}><strong>{tooltip.item_name}(+{tooltip.scroll_upgrade})</strong></div>}
      {tooltip.potential_option_grade && <div>({tooltip.potential_option_grade})</div>}
      {tooltip.item_shape_icon && <img src={tooltip.item_shape_icon} alt="item" />}
      {shouldRender(tooltip.item_total_option['str']) && <div style={{color:'#46D2D2'}}>STR : +{tooltip.item_total_option['str']}()</div>}
      {shouldRender(tooltip.item_total_option['dex']) && <div style={{color:'#46D2D2'}}>DEX : +{tooltip.item_total_option['dex']}()</div>}
      {shouldRender(tooltip.item_total_option['int']) && <div style={{color:'#46D2D2'}}>INT : +{tooltip.item_total_option['int']}()</div>}
      {shouldRender(tooltip.item_total_option['luk']) && <div style={{color:'#46D2D2'}}>LUK : +{tooltip.item_total_option['luk']}()</div>}
      {shouldRender(tooltip.item_total_option['max_hp']) && <div style={{color:'#46D2D2'}}>최대HP : +{tooltip.item_total_option['max_hp']}()</div>}
      {shouldRender(tooltip.item_total_option['max_mp']) && <div style={{color:'#46D2D2'}}>최대MP : +{tooltip.item_total_option['max_mp']}()</div>}
      {shouldRender(tooltip.item_total_option['attack_power']) && <div style={{color:'#46D2D2'}}>공격력 : +{tooltip.item_total_option['attack_power']}()</div>}
      {shouldRender(tooltip.item_total_option['magic_power']) && <div style={{color:'#46D2D2'}}>마력 : +{tooltip.item_total_option['magic_power']}()</div>}
    </div>
  );
}

export default Tooltip;
