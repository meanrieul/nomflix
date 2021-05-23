import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  margin-bottom: 100px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Youtube = styled.iframe`
  margin: 50px;
  width: 60%;
  height: 60%;
`;

const ProductorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  height: 50px;
  color: black;
  font-size: 24px;
  justify-content: center;
`;
const Productor = styled.img`
  height: 70%;
  margin: 0px 20px;
`;

const Imdb = styled.a`
  display: flex;
  border: 2px solid black;
  border-radius: 4px;
  width: 50px;
  height: 25px;
  justify-content: center;
  align-items: center;
  background-color: #e2b616;
  color: black;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Seasons = styled.div`
  margin-top: 300px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SeasonPoster = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  margin: 20px;
  height: 140px;
  width: 90px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date
                : result.first_air_date}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime
                ? `${result.runtime} min`
                : `${result.number_of_episodes} episodes`}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>·</Divider>
            <Item>{result.original_language}</Item>
            <Divider>·</Divider>
            <Item>
              {result.production_countries &&
                result.production_countries.map((country, index) =>
                  index === result.production_countries.length - 1
                    ? country.name
                    : `${country.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.imdb_id && (
            <Imdb
              href={`https://www.imdb.com/title/${result.imdb_id}`}
              target="_blank"
            >
              IMDb
            </Imdb>
          )}
          {result.videos.results && result.videos.results.length > 0 && (
            <Youtube
              src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
            />
          )}
        </Data>
      </Content>{" "}
      <Seasons>
        {result.seasons &&
          result.seasons.length > 0 &&
          result.seasons.map((season) => (
            <SeasonPoster
              bgImage={
                season.poster_path
                  ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                  : require("../../assets/noPosterSmall.png")
              }
            />
          ))}
      </Seasons>
      <ProductorContainer>
        {console.log(result)}
        {result?.production_companies &&
          result.production_companies.map((company) =>
            company.logo_path ? (
              <Productor
                src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                alt={company.name}
              />
            ) : (
              <>{company.name} </>
            )
          )}
      </ProductorContainer>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
