import './style.css';
import { Button, Paper, InputBase} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { styled } from '@mui/material/styles';



const SearchButton:React.FC<{
    handleSearchButtonClick:()=>void}> = ({
    handleSearchButtonClick
  }) => {
    return (
  <StyledSearchButton  onClick={handleSearchButtonClick} variant="contained">
    Search
  </StyledSearchButton>
)}

const StyledSearchButton = styled(Button)({
  boxShadow: "none",
  backgroundColor:"#1E86FF",
  minWidth: "170px",
  minHeight: "60px"
  });


const MainSearchBar:React.FC<{
  handleMainSearchBar: (event: React.ChangeEvent<HTMLInputElement>) => void,handleSearchButtonClick:()=>void}> = 
 ({handleMainSearchBar,handleSearchButtonClick}) => {
  return (
    <Paper
      component="form"
      sx={{ p: '5px 5px', display: 'flex', alignItems: 'center', width: "60%", minHeight: "60px" }}
    >
      <WorkOutlineIcon sx={{ m: '4px 10px'}} style={{color:"#B9BDCF"}}/>
      <InputBase
        sx={{  flex: 1 }}
        placeholder="Title, companies, expertise or benefits"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleMainSearchBar}
      />
      <SearchButton handleSearchButtonClick={handleSearchButtonClick}/>
    </Paper>
  );
}

export default MainSearchBar;
