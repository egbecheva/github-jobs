import React from 'react';
import './style.css';
import { Grid, Paper, Box  } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from "./SearchBar"
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: [
//       'Poppins',
//     ].join(','),
//   },});

function App() {
  return (
    <div>
      <Box mx={20}>
      <h1 className="gh-jobs-title"><strong>Github</strong> Jobs</h1>
        <Grid  container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={12}>
            <Item className="gh-jobs-header">
              <SearchBar/>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>2</Item>
          </Grid>
          <Grid item xs={12} md={8}>
            <Item>3</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
