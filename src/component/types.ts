//types.ts
export interface DraggableImageProps {
    id: string;
    src: string;
    name: string;
    index: number;
    //moveImage: (dragIndex: number, hoverIndex: number) => void;
    handleClick: (name: string) => void;
    //Wrapper: React.FC<any>
  }

export interface DetailModalProps {
    data: SetItemType | null; // null 허용
  }

export interface MyApiState {
    data: CharacterData | null;
    item: ItemData | null;
    setItem: SetItemType | null;
    ocid: string;
    loading: boolean;
    error: string | null;
  }
export interface SetItemType{
    detail: {
        final_stat: Array<{
        stat_name: string;
        stat_value: number;
        }>;
        // 다른 필드들...
    };
}

  // itemData의 타입 정의
export interface ItemData {
    item_equipment?: Item[];
    id: string;
    item_name: string;
    item_icon: string;
    item_equipment_slot: string;
    gridArea?: string;

    potential_option_2: any;
    potential_option_3: any;
    potential_option_1: any;
    starforce?: number;
    scroll_upgrade?: number;
    potential_option_grade?: string;
    item_shape_icon?: string;
    item_description?: string;
    item_total_option: {
        [key: string]: number | undefined;
    };
    golden_hammer_flag?: boolean;
    cuttable_count?: number;
    additional_potential_option_grade?: string;
    additional_potential_option_1?: string;
    additional_potential_option_2?: string;
    additional_potential_option_3?: string;
    
  }
  
  // Item 객체의 타입 정의
 export interface Item {
    id: string;
    item_name: string;
    item_icon: string;
    item_equipment_slot: string;
    gridArea?: string;
    tooltip:TooltipData;

    potential_option_2: any;
    potential_option_3: any;
    potential_option_1: any;
    item_total_option: {
        [key: string]: number | undefined;
    };
  }
  // Tooltip 객체의 타입 정의 (가정)
export interface TooltipData {
    // Tooltip에 필요한 속성들 정의    
    tooltip: {
        potential_option_2: any;
        potential_option_3: any;
        potential_option_1: any;
        starforce?: number;
        item_name?: string;
        scroll_upgrade?: number;
        potential_option_grade?: string;
        item_shape_icon?: string;
        item_description?: string;
        item_total_option: {
          [key: string]: number | undefined;
        };
        golden_hammer_flag?: boolean;
        cuttable_count?: number;
        additional_potential_option_grade?: string;
        additional_potential_option_1?: string;
        additional_potential_option_2?: string;
        additional_potential_option_3?: string;
        
        // 기타 필요한 필드 추가...
      }; 
  }
  
 export interface ModalComponentProps {
    itemData: ItemData | null;
    tooltipData?: TooltipData; // TooltipData 필드 추가
  }

 export interface ModalsState {
    modal: boolean;
    infomodal: boolean;
  }

// Redux 전체 스토어의 상태를 나타내는 인터페이스
export interface RootState {
    myApi: MyApiState;
    myModal: {
      modals: ModalsState;
    };
  }
  
 export interface CharacterData {
    character_name: string;
    world_name: string;
    character_class: string;
    character_class_level: number;
    character_level: number;
    character_exp: number;
    character_exp_rate: number;
    character_guild_name: string;
    character_image?: string;
    // 기타 필요한 필드...
  }

 export interface InfoModalComponentProps {
    ocid: string | null; // ocid prop을 추가합니다.
  }
