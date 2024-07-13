import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import classes from "./SearchBar.module.css";
import { useGetAllListsQuery } from "../../../redux/services/listsApiSlice";
import { useGetAllBooksQuery } from "../../../redux/services/booksApiSlice";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../Types/books.types";
import { List } from "../../../Types/lists.types";

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(() => ({
  width: 256,
  height: 32,
  borderRadius: 100,
  backgroundColor: "var(--gray-color)",
  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
  outline: "none",
  border: "none",
  padding: "0 12px",
  caretColor: "var(--primary-color)",
}));

const Listbox = styled("ul")(() => ({
  maxHeight: 270,
  width: 512,
  marginTop: "12px",
  padding: "4px 12px",
  zIndex: 1,
  listStyle: "none",
  backgroundColor: "white",
  overflow: "auto",
  border: "1px solid var(--gray-color)",
  boxShadow: "var(--shadow-near)",
  borderRadius: "var(--large-border-radius)",
  "& li": {
    color: "var(--dark-primary-color)",
    height: 32,
    padding: "0 8px",
    display: "flex",
    alignItems: "center",
    borderRadius: "var(--small-border-radius)",
    fontSize: "16px",
  },
  "& li:hover": {
    backgroundColor: "var(--gray-color)",

    cursor: "pointer",
  },
  "& li:focus": {
    backgroundColor: "var(--gray-color)",
  },
  "& li:active": {
    backgroundColor: "var(--primary-color)",
    color: "white",
  },
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

export default function SearchBar() {
  const navigate = useNavigate();
  const { data: lists } = useGetAllListsQuery();
  const { data: books } = useGetAllBooksQuery();

  const results = [...(lists ?? []), ...(books ?? [])].sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });


  const goToResult = (option: Book | List) => {
    if ((option as Book).isbn) {
      navigate(`/books/${option.id}`)
    } else {
      navigate(`/lists/${option.id}`);
    }
  };

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "search-bar",
    autoComplete: true,
    autoHighlight: true,
    autoSelect: true,
    selectOnFocus: true,
    options: results.slice(0, 7),
    getOptionLabel: (option) => option.title,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}></Label>
        <Input {...getInputProps()} placeholder="Search for books and lists" />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof results).map((option, index) => (
            <li
              {...getOptionProps({ option, index })}
              key={index}
              onClick={() => goToResult(option)}
            >
              {option.title}
            </li>
          ))}
          <button className={classes.More}>See more results</button>
        </Listbox>
      ) : null}
    </div>
  );
}
