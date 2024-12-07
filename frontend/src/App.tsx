import MessageList from "../src/components/Message/MessageList";
import MessageForm from "../src/components/MessageForm/MessageForm";
import { Box } from '@mui/material';

const App = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        marginX: 'auto',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <MessageForm />
      <MessageList />
    </Box>
  );
};

export default App;
