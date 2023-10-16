import React, { useState, useEffect } from "react";
import theme from "./theme";
import {
  ThemeProvider,
  CssBaseline,
  Grid,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/index";
import Bookmarks from "./components/BookMark/index";
import Definition from "./components/WordDef/index";

const App = () => {
  // fetching ur bookmarks from your localStorage or an empty obj
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || {}
  );

  // saves bookmarks to localStorage whenever you add/remove a bookmark
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // adding bookmark function
  const addBookmark = (word, definitions) =>
    setBookmarks((Bookmarks) => ({
      ...Bookmarks,
      [word]: definitions,
    }));

  // function to remove a bookmark
  const removeBookmark = (word) =>
    setBookmarks((Bookmarks) => {
      const newBook = { ...Bookmarks };
      delete newBook[word];
      return newBook;
    });

  return (
    //themeProvider gets ur theme from theme.js
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        sx={{ p: 2, mt: { xs: 0, sm: 2 } }}
        justifyContent="center" //xs sets no margin on extra small (xs) screens and sm makes the margin top 2 when small screens or larger
      >
        <Grid item xs={12} sm={8} md={5} lg={3}>
          {/* 
       here we costumize so the grid is responsive to different sizes of screens
    */}
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/bookmarks" element={<Bookmarks bookmarks={bookmarks} />} />
              <Route
                path="/search/:word"
                element={
                  <Definition
                    bookmarks={bookmarks}
                    addBookmark={addBookmark}
                    removeBookmark={removeBookmark}
                  />
                }
              />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
