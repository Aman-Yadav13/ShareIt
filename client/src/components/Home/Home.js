import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ theme }) => {
  //data-management without redux
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const classes = useStyles();
  const page = query.get("page") || 1; //reads url and check if page there , if no page , then on first one
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search post
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/"); //redirect back if searched for nothing
    }
  };

  
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column-reverse",
            },
          }}
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <MuiChipsInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAddChip={handleAdd}
                onDeleteChip={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} classes={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
