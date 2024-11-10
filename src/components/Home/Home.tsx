import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input, Title } from "./Home.styled";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function generateUniqueRoomId() {
    return Math.random().toString(36).substring(2, 9);
  }

  const handleJoinRoom = () => {
    const id = roomId || generateUniqueRoomId();
    if (username) {
      navigate(`/room/${id}`, { state: { username } });
    }
  };

  return (
    <Container>
      <Title>👯 Присоединяйся к Видеочату!</Title>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Введите ваше имя"
      />
      <Input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Введите ID комнаты или создайте новый"
      />
      <Button onClick={handleJoinRoom}>Войти в комнату</Button>
    </Container>
  );
};

export default Home;
