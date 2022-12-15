import './style.css';
import { Button, Paper, InputBase } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton: React.FC<{
  handleSearchButtonClick: () => void;
}> = ({ handleSearchButtonClick }) => {
  return (
    <>
      <StyledSearchButton
        className='btn-min-width'
        onClick={handleSearchButtonClick}
        variant='contained'
      >
        <SearchIcon className='visible-xs' />
        <span style={{ color: 'white' }} className='hidden-xs'>
          Search
        </span>
      </StyledSearchButton>
    </>
  );
};

const StyledSearchButton = styled(Button)({
  boxShadow: 'none',
  backgroundColor: '#1E86FF',
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
        flexGrow: '0.5',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          marginLeft: '15px',
          flexGrow: '1',
        }}
      >
        <WorkOutlineIcon style={{ color: '#B9BDCF' }} />
        <InputBase
          style={{ width: '100%' }}
          placeholder='Title, companies, expertise or benefits'
          onChange={handleMainSearchBar}
        />
      </div>
      <SearchButton handleSearchButtonClick={handleSearchButtonClick} />
    </Paper>
  );
};

export default MainSearchBar;
