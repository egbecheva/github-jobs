import './style.css';
import { Button, Paper, InputBase } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { styled } from '@mui/material/styles';

const SearchButton: React.FC<{
  handleSearchButtonClick: () => void;
}> = ({ handleSearchButtonClick }) => {
  return (
    <StyledSearchButton onClick={handleSearchButtonClick} variant='contained'>
      Search
    </StyledSearchButton>
  );
};

const StyledSearchButton = styled(Button)({
  boxShadow: 'none',
  backgroundColor: '#1E86FF',
  minWidth: '170px',
  minHeight: '60px',
  margin: '5px',
});

const MainSearchBar: React.FC<{
  handleMainSearchBar: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchButtonClick: () => void;
}> = ({ handleMainSearchBar, handleSearchButtonClick }) => {
  return (
    <Paper
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '60px',
        flexGrow: '0.5',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          marginLeft: '15px',
        }}
      >
        <WorkOutlineIcon style={{ color: '#B9BDCF' }} />
        <InputBase
          placeholder='Title, companies, expertise or benefits'
          onChange={handleMainSearchBar}
        />
      </div>
      <SearchButton handleSearchButtonClick={handleSearchButtonClick} />
    </Paper>
  );
};

export default MainSearchBar;
