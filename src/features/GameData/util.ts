import { AxiosResponse } from "axios";
import { ChampState } from "./GameData.slice";

type RawChamp = {
  key: string;
  id: string;
  name: string;
  tags: string[];
  version: string;
  image: {
    full: string;
    group: string;
    sprite: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

export const handleRawChampList = (data: AxiosResponse): Array<ChampState> => {
  // 이름 가나다 순으로 챔피언 리스트 정렬하기.
  const newList: Array<ChampState> = Object.values(
    data.data.data as Array<RawChamp>
  )
    .sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    })
    .map((rawChamp: RawChamp): ChampState => {
      return {
        key: parseInt(rawChamp.key),
        id: rawChamp.id,
        name: rawChamp.name,
        version: rawChamp.version,
        tags: rawChamp.tags,
      };
    });
  return newList;
};

export const getURL = () => {};
