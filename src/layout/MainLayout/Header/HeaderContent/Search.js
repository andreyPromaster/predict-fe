import { Stack, Button, Autocomplete, TextField } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvailableTickers } from "api/Tickers"
import { availableTickersUploaded } from 'store/reducers/ticker'


const Search = (props) => {
  const { onTickerCompleted } = props
  const dispatch = useDispatch()
  const availableTickers = useSelector((state) => state.ticker.availableTickers)
  const [ticker, setTicker] = useState("");

  useEffect(() => {
    if (availableTickers.length === 0) {
      fetchAvailableTickers().then((response) => {
        dispatch(availableTickersUploaded(response.data))
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [])

  return (
    <Stack direction="row" spacing={2}>

      <Autocomplete
        sx={{
          width: { xs: '40%', md: '25%' }, '& .MuiAutocomplete-endAdornment': { top: 0 },
          '& .MuiAutocomplete-inputRoot': { '&.MuiInputBase-sizeSmall': { "padding-left": '12px' } }
        }}
        id="custom-input-demo"
        noOptionsText="No predicted symbols"
        options={availableTickers}
        onChange={(event, value) => { setTicker(value) }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder="Typing symbol"
            InputProps={{
              ...params.InputProps,

              startAdornment: (
                <SearchOutlined />
              ),
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      >
      </Autocomplete>
      <Button onClick={e => { if (ticker) { onTickerCompleted(e, ticker) } }} style={{ fontWeight: 600 }} color='predictButton' size="small" variant="contained">Generate tickers forecasts</Button>
    </Stack>
  )
};


// <OutlinedInput
//   onChange={e => setTicker(e.target.value)}
//   value={ticker}
//   onKeyDown={e => onTickerCompleted(e, ticker)}
//   size="small"
//   id="header-search"
//   startAdornment={
//     <InputAdornment position="start" sx={{ mr: 0 }}>
//       <SearchOutlined />
//     </InputAdornment>
//   }
//   aria-describedby="header-search-text"
//   inputProps={{
//     'aria-label': 'weight'
//   }}
//   placeholder="Typing symbol..."
// />


export default Search;
