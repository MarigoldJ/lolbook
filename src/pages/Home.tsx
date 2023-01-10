import ChampList from "../features/ChampList";
import Searcher from "../features/Searcher";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Searcher />
      <ChampList />
    </div>
  );
}
