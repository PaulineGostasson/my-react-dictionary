import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FilledInput,
  IconButton,
  useTheme,
} from "@mui/material"; //Trying out mui/material for this project to make it easier to style my code without css I got the idea from a youtube video so trying it out and playing around with it
import {
  Bookmark as BookmarkIcon,
} from "@mui/icons-material"; //With the same package u got a lot of nice icons to make the layout look nice and clean
import { useNavigate, Link } from "react-router-dom";

const LandingPage = ({ initialValue = "" }) => {
  const [word, setWord] = useState(initialValue);
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    setWord(initialValue || "");
  }, [initialValue]);

  //Handle submit makes it so that when u press Enter key after filling out the search input ur navigated to "fecth" your word
  const handleSubmit = (event) => {
    event.preventDefault();
    const yourWord = word.trim().toLowerCase();
    if (!yourWord || yourWord.split(" ").length > 1) {
      setError(true);
      return;
    }
    navigate(`/search/${yourWord}`); // Use navigate to get to your searched word
  };

  return (
    <Box sx={{ ...theme.mixins.alignInTheCenter }}>
      <Typography
        color="primary"
        sx={{
          mt: 3, // mt = margin top
          mb: 3, // mb = margin bottom
        }}
        variant="h4" //choose desired header size
      >
        Welcome to Dictionary
      </Typography>
      <Typography color="DarkBlue">
        Cultivate knowledge and learn new words and there meanings!
      </Typography>
      <Typography color="DarkBlue">
        Press Enter to move forward!
      </Typography>
      <Box sx={{ width: "420px" }}>
        <form onSubmit={handleSubmit} data-testid="search-form">
          <FilledInput
            value={word}
            onChange={(event) => {
              setWord(event.target.value);
              setError(false);
            }}
            disableUnderline
            placeholder="Try it out! :3"
            sx={{
              my: 5, // margin top
              backgroundColor: "White",
              borderRadius: 5,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              "& .MuiFilledInput-input": {
                p: 2.5, // padding
              },
            }}
            fullWidth // makes the search 'window' the width of the container size
          />
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{
                mt: 1,
                mb: 4,
                fontWeight: "bold",
                backgroundColor: "#FFCCCC",
                borderRadius: 1,
                p: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              Please enter a word before searching.
            </Typography>
          )}
        </form>
      </Box>
      <IconButton
        to="/bookmarks"
        component={Link}
        sx={{
          borderRadius: 3,
          p: 2.5, // padding
          color: "#ffff",
          background: (theme) => theme.palette.btn, // get my customized palette from theme.js
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <BookmarkIcon />
      </IconButton>
    </Box>
  );
};

export default LandingPage;
