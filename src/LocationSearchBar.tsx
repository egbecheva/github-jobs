import './style.css';
import { Paper, InputBase } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

const LocationSearchBar: React.FC<{
  handleLocationSearchBar: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleLocationSearchBar }) => {
  return (
    <Paper
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '48px',
        boxShadow: 'none',
        marginRight: '20px',
        marginTop: '10px',
      }}
    >
      <PublicIcon sx={{ m: '4px 10px' }} style={{ color: '#B9BDCF' }} />
      <InputBase
        style={{ width: '100%' }}
        placeholder='City, state or ZIP code'
        onChange={handleLocationSearchBar}
      />
    </Paper>
  );
};

export default LocationSearchBar;
