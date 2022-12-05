import './style.css';
import { Paper, InputBase} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';


const LocationSearchBar:React.FC<{
  handleLocationSearchBar: (event: React.ChangeEvent<HTMLInputElement>) => void}> = 
 ({handleLocationSearchBar}) => {
  return (
    <Paper
      component="form"
      sx={{ p: '5px 5px', display: 'flex', alignItems: 'center', width: "60%", minHeight: "60px" }}
      >
      <PublicIcon sx={{ m: '4px 10px'}} style={{color:"#B9BDCF"}}/>
      <InputBase
        sx={{  flex: 2 }}
        placeholder="City, state, zip code or npm ry"
        onChange={handleLocationSearchBar}
        />
    </Paper>
      );
}

export default LocationSearchBar;
