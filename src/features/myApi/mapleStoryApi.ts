// api/mapleStoryApi.ts
const API_KEY = 'test_a7641d71ec05be204900f8566cb56a7af6f0f78923ab032b1624d1bffab3ac1021e887e6d3bba841e0082db089ea4e76';

export const fetchCharacterId = async (characterName: string): Promise<any> => { //ocid 값 호출(캐릭터 키값)
    const response = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(characterName)}`, {
      headers: {
        "x-nxopen-api-key": API_KEY
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

export const fetchCharacterData = async (ocid: string, yesterdayDate: string): Promise<any> => {//캐릭터 기본 정보 호출
    const response = await fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=${yesterdayDate}`, {
    headers: {
        "x-nxopen-api-key": API_KEY
    }
});
if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

export const fetchCharacterStat = async (ocid: string, yesterdayDate: string): Promise<any> => {//캐릭터 기본 정보 호출
    const response = await fetch(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}&date=${yesterdayDate}`, {
    headers: {
        "x-nxopen-api-key": API_KEY
    }
});
if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };


export const fetchItemData = async (ocid: string, yesterdayDate: string): Promise<any> => { //캐릭터 장비 아이템 호출
    const response = await fetch(`https://open.api.nexon.com/maplestory/v1/character/item-equipment?ocid=${ocid}&date=${yesterdayDate}`, {
      headers: {
        "x-nxopen-api-key": API_KEY
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
  
export const fetchItemSet_EffectData = async (ocid: string, yesterdayDate: string): Promise<any> => { //캐릭터 적용 세트 효과 정보 조회
    const response = await fetch(`https://open.api.nexon.com/maplestory/v1/character/set-effect?ocid=${ocid}&date=${yesterdayDate}`, {
      headers: {
        "x-nxopen-api-key": API_KEY
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
