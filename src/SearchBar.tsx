import './style.css';
import { TextField } from '@mui/material';


const SearchBar = () => {
  return (
    <TextField
    label="Title, companies, expertise or benefits"
    className="gh-jobs-search-bar">
    </TextField>
  );
}

export default SearchBar;
