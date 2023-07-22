import { Box } from '@mui/material';

function Header(): JSX.Element {
  return (
    <Box display="flex" justifyContent="flex-start" m={2}>
      <img src="/tesla-logo.png" alt="Logo" height={50} />
    </Box>
  );
}

export default Header;
