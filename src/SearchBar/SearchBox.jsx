import { styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material";
import { InputBase } from "@mui/material/";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgb(248, 250, 252)",
  border: "1px solid #d6d6c2",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgb(248, 250, 252)",
    border: "1.6px solid black",
  },
  "&:focus-within": {
    backgroundColor: "rgb(248, 250, 252)",
    border: "1.6px solid #3296f3",
  },
  marginRight: theme.spacing(1),
  marginLeft: 5,
  width: "97%",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0, 0.5),
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%", // the input spans the full width
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: "all .3s ease-out",
    width: "100%", // the input spans the full width
    [theme.breakpoints.down("md")]: {
      paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
      paddingRight: `calc(1em + ${theme.spacing(0.5)})`,
      "&::placeholder": {
        fontSize: "small",
        padding: `calc(1em + ${theme.spacing(0.1)})`,
      },
      padding: theme.spacing(1, 1, 1, 1),
    },
    [theme.breakpoints.up("md")]: {
      "&:focus": {
        width: "100%", // Ethe input spans the full width on focus
        border: "1px solid #3296f3",
        borderRadius: "5px",
      },
    },
  },
}));
const SearchBox = () => {
  const theme = useTheme();

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon
          sx={{
            color: "rgb(18, 25, 38)",
            [theme.breakpoints.down("md")]: {
              width: "16px",
            },
          }}
        />
      </SearchIconWrapper>
      <StyledInputBase
        sx={{ color: "rgb(18, 25, 38);", fontWeight: 500 }}
        placeholder="Search…"
      />
    </Search>
  );
};

export default SearchBox;
