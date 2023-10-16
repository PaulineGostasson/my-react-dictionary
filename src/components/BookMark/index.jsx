import React from "react";
import {
  Stack,
  IconButton,
  Typography,
  Box
} from "@mui/material"; //Trying out mui/material for this project to make it easier to style my code without css I got the idea from a youtube video so trying it out and playing around with it
import { ArrowBack as BackIcon } from "@mui/icons-material";//With the same package u got a lot of nice icons to make the layout look nice and clean
import { Link } from "react-router-dom";

const Bookmarks = ({ bookmarks }) => {
  // Check if there are bookmarks
  const hasBookmarks = !!Object.keys(bookmarks).length;

  return (
    <>
      {/* Header */}
      <Stack sx={{ mb: 4 }} direction="row" alignItems="center">
        <IconButton to="/" component={Link} sx={{ color: "black", mr: 2 }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h6">Bookmarks</Typography>
      </Stack>
      {/* Bookmarks */}
      {hasBookmarks ? (
        bookmarksList(bookmarks)
      ) : (
        // This message or (typo) will appear if u havn't added any bookmarks yet
        <Typography sx={{ mt: 6 }} align="center">
          You have no bookmarks yet :c
        </Typography>
      )}
    </>
  );
};

// function to make bookmark list
function bookmarksList(bookmarks) {
  return Object.keys(bookmarks).map((bookmark) => (
    <BookmarkItem key={bookmark} bookmark={bookmark} />
  ));
}

// function to show one bookmark
function BookmarkItem({ bookmark }) {
  return (
    <Box
      to={`/search/${bookmark}`}
      component={Link}
      sx={{
        display: "block",
        color: "black",
        textDecoration: "none",
        p: 2.5, // padding
        cursor: "pointer",
        backgroundColor: "white",
        borderRadius: 1,
        textTransform: "capitalize",
        mb: 3, // margin bottom
        fontWeight: 800,
      }}
    >
      {bookmark}
    </Box>
  );
}

export default Bookmarks;
