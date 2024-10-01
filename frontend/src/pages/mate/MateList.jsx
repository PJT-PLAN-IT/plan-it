import "../../App.css";
import "../../assets/css/Write.css";
import { Header } from "./components/mate/Header";
import Banner from "./components/mate/Banner";
import ListMainNav from "./components/mate/ListMainNav";
import ListMainTiles from "./components/mate/ListMainTiles";
import Pagination from "./components/mate/Pagination";

export default function MateList() {
  return (
    <div className=" mx-[300px]">
      <Header />
      <Banner />
      <ListMainNav />
      <ListMainTiles />
      <Pagination />
    </div>
  );
}
