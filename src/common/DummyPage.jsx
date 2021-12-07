import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import "./DummyPage.css";
// import './App.css';
import { mergeClasses } from "@material-ui/styles";
// import ReactPaginate from "react-paginate";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export function Posts() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;

  const uiData = () => {
    if (searchInput.length > 0) {
      return {
        data: filteredResults.slice(pagesVisited, pagesVisited + userPerPage),
        pagination: Math.floor(filteredResults.length / 5),
      };
    }
    return {
      data: APIData.slice(pagesVisited, pagesVisited + userPerPage),
      pagination: Math.floor(APIData.length / 5),
    };
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  console.log(uiData());
  return (
    <div style={{ padding: 20 }}>
      <Input
        icon="search"
        placeholder="Search By title"
        onChange={(e) => searchItems(e.target.value)}
      />
      <Card.Group
        className="flex column wrap"
        itemsPerRow={2}
        style={{ marginTop: 20 }}
      >
        {uiData().data.map((item) => {
          return (
            <Card className="card" sx={{ minWidth: 275 }}>
              <CardContent className="center">
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography variant="h5" component="div">
                  {item.completed}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Card.Group>
      <div className="flex page">
        {Array.from(new Array(uiData().pagination)).map((_, index) => (
          <div
            className="pagination"
            onClick={() => {
              setPageNumber(index);
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
