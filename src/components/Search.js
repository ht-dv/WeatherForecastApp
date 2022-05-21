import React, { useEffect, useState } from "react";
import { getForecast } from "../api/user-service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import images from "../data/Images.json";

const Search = () => {
  const [forecast, setForecast] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const date = moment().format("MMM DD, YYYY");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getForecast(searchTerm).then((resp) => {
        setForecast(resp.data);
        setSearchTerm("");
      });
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    getForecast("London")
      .then((resp) => {
        setForecast(resp.data);
      })
      .catch((err) => {
        console.log("ERROR");
      });
  }, []);

  return (
    <Container style={{ alignItems: "center" }}>
      <Row style={{ justifyContent: "center", marginTop: "3rem" }}>
        <Col md={6}>
          <div className="text-center">
            <form className="search-group" onSubmit={handleOnSubmit}>
              <input
                className="searchbar w-50"
                type="search"
                autoFocus="autofocus"
                placeholder="Search by city name..."
                value={searchTerm}
                onChange={handleOnChange}
              />
              <button className="search-btn" type="submit">
                <BsSearch />
              </button>
            </form>
          </div>
        </Col>
      </Row>
      <Row style={{ justifyContent: "center", marginTop: "3rem" }}>
        <Col md={6}>
          <Card className="forecastCard">
            <Card.Body>
              {searchTerm && searchTerm !== forecast?.name && (
                <h1 className="text-center">City not found...</h1>
              )}
              {(!searchTerm || searchTerm === forecast?.name) && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>{forecast?.name}</th>
                    </tr>
                  </thead>
                  {
                    <tbody>
                      <tr>
                        <th rowSpan="4" className="w-50">
                          {images.map((image, i) => {
                            return (
                              images[i].name === forecast?.weather[0].main && (
                                <div key={images[i].id}>
                                  <img
                                    src={images[i].url}
                                    className="img-fluid w-50"
                                    alt="images"
                                  />
                                </div>
                              )
                            );
                          })}
                        </th>
                        <td>{date}</td>
                      </tr>
                      <tr>
                        <td>{forecast?.weather[0].main}</td>
                      </tr>
                      <tr>
                        <td>{forecast?.main.temp}°C</td>
                      </tr>
                      <tr>
                        <td>Humidity {forecast?.main.humidity}%</td>
                      </tr>
                    </tbody>
                  }
                </table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ justifyContent: "center", marginTop: "3rem" }}>
        <Col md={6}>
          <button
            className="btn-logout btn-lg"
            type="submit"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading && <Spinner animation="border" size="sm" />} Logout
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
