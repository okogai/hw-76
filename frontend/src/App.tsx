import MessageList from "../src/components/Message/MessageList";
import MessageForm from "../src/components/MessageForm/MessageForm";
import { Container, Box } from "@mui/material";

const App = () => {
  return (
    <Container>
      <h1>Attractor chat</h1>
      <Box sx={{ mb: 2 }}>
        <MessageForm />
      </Box>
      <MessageList />

    </Container>
  );
};

export default App;
