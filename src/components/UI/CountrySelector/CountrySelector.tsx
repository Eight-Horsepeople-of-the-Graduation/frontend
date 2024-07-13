import { Autocomplete, Box, TextField } from "@mui/material";
import { countries } from "../../../data/countries";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}
const CountrySelector = ({ register }: Props) => {
  return (
    <Autocomplete
      id="country-select"
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { ...optionProps } = props;
        return (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...register}
          {...params}
          label="Country"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default CountrySelector;
