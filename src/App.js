import "bootstrap/dist/js/bootstrap";
import MainSearch from "./components/MainSearch";
//import CompanySearchResults from "./components/CompanySearchResults";
//import FavouritesCompanies from "./components/FavouritesCompanies";
//import { BrowserRouter, Routes, Route } from "react-router-dom";

/*
        <Route path="/" element={<MainSearch />} />
        <Route path="/favourites" element={<FavouritesCompanies />} />
        <Route path="/:company" element={<CompanySearchResults />} />
        */

function App() {
  return <MainSearch />;
}

export default App;
