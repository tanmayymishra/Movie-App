import React, { useEffect, useState } from "react";
import "./HeroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Image from "../../../components/lazyLoadImage/Image";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { data, loading, error } = useFetch("/movie/upcoming");

  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    setBackground(
      data
        ? url.backdrop +
            data.results[Math.floor(Math.random() * data.results.length)]
              .backdrop_path
        : ""
    );
  }, [data]);

  console.log(background, "background");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Image src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Explore hundreds of Movies/ TV Shows</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search a Movie or TV Show "
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleSearch}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
