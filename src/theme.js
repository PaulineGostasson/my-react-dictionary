import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    background: {
      default: "#b0bcff",
    },
    primary: {
      main: "#0026ff",
    },
    btn: "linear-gradient(0deg, rgba(197,69,252,1) 65%, rgba(252,125,255,1) 100%);",
  },
  typography: {
    fontFamily: "arial",
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 800,
    },
    subtitle: {
      fontWeight: 800,
    },
  },
  mixins: {
    alignInTheCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  },
});
