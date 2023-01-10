import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ChampState, fetchChampListAsync } from "./ChampList.slice";

export default function ChampList() {
  const champList = useAppSelector(
    (state: RootState) => state.champList.champs
  );
  const version = useAppSelector((state: RootState) => state.champList.version);
  const dispatch = useAppDispatch();

  const handleUpdateBtn: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    dispatch(fetchChampListAsync({ version: inputVersion, language: "ko_KR" }));
  };

  // 임시 버전 입력기능
  const [inputVersion, setInputVersion] = React.useState<string>("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputVersion(event.target.value);
  };

  return (
    <div>
      <p>
        <input value={inputVersion} onChange={handleChange} />
        <button onClick={handleUpdateBtn}>update</button>
      </p>

      <h3>{`LOL Version: ${version}`}</h3>
      {champList.map((champ: ChampState) => (
        <li key={`li_${champ.key}`}>{champ.name}</li>
      ))}
    </div>
  );
}
