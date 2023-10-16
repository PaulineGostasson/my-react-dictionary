import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Button
} from "@mui/material"; //Trying out mui/material for this project to make it easier to style my code without css I got the idea from a youtube video so trying it out and playing around with it

import {
  ArrowBack as BackIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
  PlayArrow as PlayIcon
} from "@mui/icons-material"; // and with the same package comes a lot of fun icons you can use

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios"; // axios is a JS lib used to make HTTP requests from node from the browser

import styled from "@emotion/styled"; // @emotion/styled is also an additional package which make it possible to create react comp that has styles attached to them

const AlignCenterBox = styled(Box)(({ theme }) => ({
  ...theme.mixins.alignInTheCenter,
}));

const Definition = ({ bookmarks, addBookmark, removeBookmark }) => {
  const { word } = useParams(); // access word param or parameter from the Url with useParams
  const navigate = useNavigate();
  const [definitions, setDefinitions] = useState([]);
  const [exist, setExist] = useState(true);
  const [audio, setAudio] = useState(null);

  const isBookmarked = Object.keys(bookmarks).includes(word);


  // const to find if there are a phonetic to searched word if so displays an audio btn
  const updateState = (data) => {
    setDefinitions(data);
    const [phonetic] = data[0]?.phonetics || [];
    if (phonetic) {
      const url = phonetic.audio.replace("//ssl", "https://ssl");
      setAudio(new Audio(url));
    }
  };


  // here we fetch definition from out free api /word
  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const resp = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        updateState(resp.data);
      } catch (error) {
        setExist(false);
      }
    };

    if (!isBookmarked) fetchDefinition();
    else updateState(bookmarks[word]);
  }, []);

  const goBack = () => navigate('/'); // const for going back to previous page when pressing arrow back button

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(word);
    } else {
      addBookmark(word, definitions);
    }
  }; //const for toggling the bookmark icon on and off and when bookmarked save it to your bookmark page

  return (
    <>
      {!exist ? (
        <AlignCenterBox>
          <Typography>Sorry, we couldn't find this word in our Dictionary...</Typography>
          <Button
            variant="contained" // contained makes it so that the "button" looks like an actual button and not just colored text
            sx={{ textTransform: "capitalize", mt: 1.3 }} // text transform is used to that the first letter is capitalized
            onClick={goBack} // here Im calling my goBack const
          >
            Return to Search
          </Button>
        </AlignCenterBox>
      ) : !definitions.length ? ( // here we make sure the conditions are met 
        // if the definitions are empty (array length 0) it should display a loading spinner
        <AlignCenterBox>
          <CircularProgress />
        </AlignCenterBox>
      ) : (
        // if the array isn't empty it will display the following code
        <>
          <Stack direction="row" justifyContent="space-between">
            <IconButton onClick={goBack}>
              <BackIcon sx={{ color: "darkblue" }} />
            </IconButton>
            <IconButton onClick={toggleBookmark}>
              {isBookmarked ? (
                <BookmarkedIcon sx={{ color: "darkblue" }} />
              ) : (
                <BookmarkIcon sx={{ color: "darkblue" }} />
              )}
            </IconButton>
          </Stack>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            sx={{ //sx = prop for a shortcut to define custom styles that lets you work with CCS packages available in @mui/system
              mt: 5, // mt = margin top
              background:
                "linear-gradient(90deg, rgba(140,123,255,1) 9%, rgba(0,38,240,1) 100%);",
              boxShadow: "0px 10px 20px rgba(19, 27, 70, 0.35)",
              px: 5, // px = padding lft
              py: 6, // py = padding top
              color: "white",
              borderRadius: 5,
            }}
          >
            <Typography sx={{ textTransform: "capitalize" }} variant="h5">
              {word}
            </Typography>
            {audio && (
              <IconButton
                onClick={() => audio.play()}
                sx={{
                  borderRadius: 1,
                  p: 1.3, // p = padding
                  color: "#ffff",
                  background: (theme) => theme.palette.btn, // fetching palette from my theme.js
                }}
              >
                <PlayIcon />
              </IconButton>
            )}
          </Stack>
          {definitions.map((def, idx) => (
            <Box
              key={idx}
              sx={{
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
                backgroundColor: "#ffff",
                p: 3, // p = padding
                borderRadius: 2,
                mt: 3, // mt = margin top
              }}
            >
              {/* 
      Inside this Box, the content related to 
      the variable (def) will be displayed such as noun etc.
    */}
              <Typography
                sx={{ textTransform: "capitalize" }}
                color="GrayText"
                variant="subtitle" // we fetch the subtitle from my custom theme.js
              >
                {/* gets the partOfSpeech if its available in the definition prop and ensure the code so it does not break if something is undefined (array 0) */}
                {def.meanings[0]?.partOfSpeech}
              </Typography>
              {def.meanings.map((meaning) =>
                meaning.definitions.map((definition, idx) => (
                  // here we loop through every meaning and its definition/s for searched word
                  // idx only represents the index of definition/s array
                  // in this typography( prop associated with UI variants with semantic elem )
                  <Typography
                    sx={{ my: 2 }} // my = margin top
                    variant="body2"
                    color="GrayText"
                    key={idx}
                  >
                    {/* 
                    Here we call the def and its idx (if there are more than 1)
                    if there is more than 1, its going to display the idx 1 which stands for 1st definition
                     */}
                    {meaning.definitions.length > 1 && `${idx + 1}. `}
                    {definition.definition}
                  </Typography>
                ))
              )}
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default Definition;
