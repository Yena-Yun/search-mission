import { useState } from "react";

const KEY = {
  ArrowDown: "ArrowDown",
  ArrowUp: "ArrowUp",
  Enter: "Enter",
  BackSpace: "BackSpace",
  Delete: "Delete",
};

export default function useSuggestionFocus(
  suggestions,
  setSearchName,
  setOpenModal,
  searchRef
) {
  const [focusIdx, setFocusIdx] = useState(-2);
  const suggestionLength = suggestions.length;

  const changeIdxNum = (e) => {
    const key = e.key;

    if (key === KEY.Escape) {
      setOpenModal(false);
      setSearchName("");
    }

    if (suggestionLength > 0) {
      searchRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      if (key === KEY.ArrowDown) {
        e.preventDefault();
        setFocusIdx((prev) => (prev + 1) % suggestionLength);
      }

      if (key === KEY.ArrowUp) {
        e.preventDefault();
        setFocusIdx((prev) => (prev - 1 + suggestionLength) % suggestionLength);
      }

      if (key === KEY.Enter) {
        if (focusIdx >= 0) {
          setSearchName(suggestions[focusIdx].name);
          setFocusIdx(-1);
        }
      }

      if (key === KEY.BackSpace || key === KEY.Delete) {
        setFocusIdx(-1);
      }
    }
  };

  return {
    changeIdxNum,
    focusIdx,
    setFocusIdx,
  };
}
