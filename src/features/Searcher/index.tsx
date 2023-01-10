import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { update } from "./Searcher.slice";

export default function Searcher() {
  // state에서 searcher의 text를 불러오도록 도와줌.
  const searcher = useAppSelector((state: RootState) => state.searcher.text);
  const dispatch = useAppDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(update(event.target.value));
  };

  return (
    <div>
      <p>
        <input value={searcher} onChange={handleChange} />
        <button>Search</button>
      </p>
    </div>
  );
}
