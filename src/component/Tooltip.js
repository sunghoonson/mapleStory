import React from 'react';

function Tooltip({ tooltip}) {
  // 값이 0, null, 또는 undefined가 아닌지 확인하는 함수
  const shouldRender = value => {
    if (typeof value === 'string' && value !== '0') {
      // Replace newline characters with <br> tags and return as HTML
      return { __html: value.replace(/\n/g, '<br>') };
    } else {
      // Check if value is not null, undefined, zero (as number or string)
      return value !== null && value !== undefined && value !== '0' && value !== 0;
    }
  };
  
  function getOptionGradeColor(grade) {
    switch (grade) {
      case '레어':
       return 'skyblue';
      case '에픽':
        return '#d09aff'; //보라
      case '유니크':
        return 'gold'; 
      case '레전드리':
        return 'lightgreen'; 
      default:
        return 'white';
    }
  }

  return (
    <div
      className="tooltip"
      style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {shouldRender(tooltip.starforce) && <div style={{color:'yellow'}}>{tooltip.starforce}성</div>}
      {<div style={{color:'pink'}}><strong>{tooltip.item_name}(+{tooltip.scroll_upgrade})</strong></div>}
      {tooltip.potential_option_grade && <div>({tooltip.potential_option_grade})</div>}
      {tooltip.item_shape_icon && <img src={tooltip.item_shape_icon} alt="item" />}
      {shouldRender(tooltip.item_description) && <div dangerouslySetInnerHTML={shouldRender(tooltip.item_description)}></div>}
      {shouldRender(tooltip.item_total_option['str']) && <div style={{color:'#46D2D2'}}>STR : +{tooltip.item_total_option['str']}()</div>}
      {shouldRender(tooltip.item_total_option['dex']) && <div style={{color:'#46D2D2'}}>DEX : +{tooltip.item_total_option['dex']}()</div>}
      {shouldRender(tooltip.item_total_option['int']) && <div style={{color:'#46D2D2'}}>INT : +{tooltip.item_total_option['int']}()</div>}
      {shouldRender(tooltip.item_total_option['luk']) && <div style={{color:'#46D2D2'}}>LUK : +{tooltip.item_total_option['luk']}()</div>}
      {shouldRender(tooltip.item_total_option['max_hp']) && <div style={{color:'#46D2D2'}}>최대HP : +{tooltip.item_total_option['max_hp']}()</div>}
      {shouldRender(tooltip.item_total_option['max_mp']) && <div style={{color:'#46D2D2'}}>최대MP : +{tooltip.item_total_option['max_mp']}()</div>}
      {shouldRender(tooltip.item_total_option['attack_power']) && <div style={{color:'#46D2D2'}}>공격력 : +{tooltip.item_total_option['attack_power']}()</div>}
      {shouldRender(tooltip.item_total_option['magic_power']) && <div style={{color:'#46D2D2'}}>마력 : +{tooltip.item_total_option['magic_power']}()</div>}
      {shouldRender(tooltip.item_total_option['armor']) && <div style={{color:'#46D2D2'}}>방어력 : +{tooltip.item_total_option['armor']}()</div>}
      {shouldRender(tooltip.item_total_option['speed']) && <div style={{color:'#46D2D2'}}>이동속도 : +{tooltip.item_total_option['speed']}()</div>}
      {shouldRender(tooltip.item_total_option['jump']) && <div style={{color:'#46D2D2'}}>점프력 : +{tooltip.item_total_option['jump']}()</div>}
      {shouldRender(tooltip.item_total_option['boss_damage']) && <div style={{color:'#fff'}}>보스 공격 시 데미지 증가(%) : +{tooltip.item_total_option['boss_damage']}()</div>}
      {shouldRender(tooltip.item_total_option['ignore_monster_armor']) && <div style={{color:'#fff'}}>몬스터 방어율 무시(%) : +{tooltip.item_total_option['ignore_monster_armor']}()</div>}
      {shouldRender(tooltip.item_total_option['all_stat']) && <div style={{color:'#fff'}}>올스탯(%) : +{tooltip.item_total_option['all_stat']}()</div>}
      {shouldRender(tooltip.item_total_option['damage']) && <div style={{color:'#fff'}}>데미지(%) : +{tooltip.item_total_option['damage']}()</div>}
      {shouldRender(tooltip.item_total_option['equipment_level_decrease']) && <div style={{color:'#fff'}}>착용 레벨 감소 : -{tooltip.item_total_option['equipment_level_decrease']}()</div>}
      {shouldRender(tooltip.item_total_option['max_hp_rate']) && <div style={{color:'#fff'}}>최대 HP(%) : +{tooltip.item_total_option['max_hp_rate']}()</div>}
      {shouldRender(tooltip.item_total_option['max_mp_rate']) && <div style={{color:'#fff'}}>최대 MP(%) : +{tooltip.item_total_option['max_mp_rate']}()</div>}
      {shouldRender(tooltip.golden_hammer_flag) && <div style={{color:'#fff'}}>황금망치 제련 {tooltip.golden_hammer_flag}</div>}
      {shouldRender(tooltip.cuttable_count) && <div style={{color:'gold'}}>가위 사용 가능 횟수 : {tooltip.cuttable_count}회</div>}
      <div className='spot-line'></div>
      {shouldRender(tooltip.potential_option_grade) && <div style={{ color: getOptionGradeColor(tooltip.potential_option_grade) }}>
        잠재옵션: {tooltip.potential_option_grade}
      </div>}
      {tooltip.potential_option_1 && <div>{tooltip.potential_option_1}</div>}
      {tooltip.potential_option_2 && <div>{tooltip.potential_option_2}</div>}
      {tooltip.potential_option_3 && <div>{tooltip.potential_option_3}</div>}
      <div className='spot-line'></div>
      {shouldRender(tooltip.additional_potential_option_grade) && <div style={{ color: getOptionGradeColor(tooltip.additional_potential_option_grade) }}>
        에디셔널 잠재옵션: {tooltip.additional_potential_option_grade}
      </div>}
      {tooltip.potential_option_1 && <div>{tooltip.additional_potential_option_1}</div>}
      {tooltip.potential_option_2 && <div>{tooltip.additional_potential_option_2}</div>}
      {tooltip.potential_option_3 && <div>{tooltip.additional_potential_option_3}</div>}
    </div>
  );
}

export default Tooltip;
