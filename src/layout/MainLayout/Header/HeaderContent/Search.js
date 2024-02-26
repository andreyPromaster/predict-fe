import { Box, Button, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Search = (props) => {
  const {onTickerCompleted} = props
  const [ticker, setTicker] = useState("");
  return (
  <Box>
    <FormControl sx={{ width: { xs: '35%', md: 224 } }}>
      <OutlinedInput
        onChange={e => setTicker(e.target.value)}
        value={ticker}
        onKeyDown={e => onTickerCompleted(e, ticker)}
        size="small"
        id="header-search"
        startAdornment={
          <InputAdornment position="start" sx={{ mr: 0 }}>
            <SearchOutlined />
          </InputAdornment>
        }
        aria-describedby="header-search-text"
        inputProps={{
          'aria-label': 'weight'
        }}
        placeholder="Typing symbol..."
      />
    </FormControl>
    <Button onClick={e => onTickerCompleted(e, ticker)} sx={{ml: 2, py: 0.68}} style={{ fontWeight: 600 }} color='predictButton' size="small" variant="contained">Generate tickers forecasts</Button>
  </Box>
)};

export default Search;
