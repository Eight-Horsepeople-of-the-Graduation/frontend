const convertToTitleCase = (str: string | undefined) => {
  return str?.split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default convertToTitleCase;
