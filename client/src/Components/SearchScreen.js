import React from "react";
import SideBarSearch from "./SideBarSearch";
import Search from "./Search";
import useLocalState from "../customHooks/useLocalState";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchScreen = () => {
  const [query, setQuery] = useLocalState("coffeeShopQuery", "");
  const [cityQuery, setCityQuery] = useLocalState("coffeeShopCityQuery", "");
  const [stateQuery, setStateQuery] = useLocalState("coffeeShopStateQuery", "");
  const [zipQuery, setZipQuery] = useLocalState("coffeeShopZipQuery", "");
  const [coffeeShops, setCoffeeShops] = useLocalState("coffeeShops", []);

  //TODO reset these when log out, or something like that.
  // localStorage.clear() will take everything out of localStorage
  // we can either call that on logout, or do localStorage.removeItem("<some-key>");
  // for each key want want removed
  // docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

  // make state for results (empty array)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e :>> ", e);
    const params = {
      name: query,
      city: cityQuery,
      state: stateQuery,
      zip: zipQuery,
    };
    axios
      .get(`/api/coffee_shops`, { params }) // <--- add query params in the options hash
      .then((res) => setCoffeeShops(res.data))
      .catch(console.log);
  };

  return (
    <>
      <SideBarSearch
        handleSubmit={handleSubmit}
        setCityQuery={setCityQuery}
        setStateQuery={setStateQuery}
        setZipQuery={setZipQuery}
        cityQuery={cityQuery}
        stateQuery={stateQuery}
        zipQuery={zipQuery}
      />
      <Search
        coffeeShops={coffeeShops}
        handleSubmit={handleSubmit}
        setQuery={setQuery}
        query={query}
      />
    </>
  );
};

export default SearchScreen;
