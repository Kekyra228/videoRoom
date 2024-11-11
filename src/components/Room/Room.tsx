import Peer, { DataConnection, MediaConnection } from "peerjs";
import {
  Button,
  Label,
  Video,
  VideoContainer,
  VideoWrapper,
} from "./Room.styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Room = () => {
  const { roomId } = useParams<{ roomId?: string }>();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [remoteUsername, setRemoteUsername] = useState<string | null>(null);
  const username = location.state?.username || "Аноним";

  const [peerId, setPeerId] = useState<string | null>(null);
  const [connectionId, setConnectionId] = useState<string>("");
  const [peer, setPeer] = useState<Peer | null>(null);

  useEffect(() => {
    if (!roomId) {
      console.error("ID комнаты не найден");
      return;
    }

    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      setPeerId(id);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
        }

        // Обработка входящих вызовов
        newPeer.on("call", (call: MediaConnection) => {
          call.answer(stream);
          call.on("stream", (remoteStream: MediaStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        });

        newPeer.on("connection", (conn: DataConnection) => {
          conn.on("data", (data) => {
            if (typeof data === "string") {
              setRemoteUsername(data);
              conn.send(username);
            }
          });
        });
      })
      .catch((err: any) => {
        console.error("Не удалось получить локальный поток", err);
      });

    return () => {
      newPeer.destroy();
    };
  }, [roomId]);

  // Функция для подключения к другому участнику по его peerId
  const handleConnect = () => {
    if (peer && connectionId) {
      const call = peer.call(
        connectionId,
        localVideoRef.current!.srcObject as MediaStream
      );

      const conn = peer.connect(connectionId);
      conn.on("open", () => {
        conn.send(username); // Отправляем свое имя второму участнику
      });

      conn.on("data", (data) => {
        if (typeof data === "string") {
          setRemoteUsername(data); // Устанавливаем имя второго участника
        }
      });

      call.on("stream", (remoteStream: MediaStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        }
      });
    }
  };

  const handleLeaveRoom = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <h3> Номер комнаты:{roomId}</h3>
        <h3>Ваш peerId: {peerId}</h3>
      </div>
      <div>
        <input
          type="text"
          placeholder="Введите peerId собеседника"
          value={connectionId}
          onChange={(e) => setConnectionId(e.target.value)}
        />
        <button onClick={handleConnect}>Подключиться к участнику</button>
      </div>
      <VideoContainer>
        <VideoWrapper>
          <Label>{username}</Label>
          <Video ref={localVideoRef} muted autoPlay />
        </VideoWrapper>
        <VideoWrapper>
          <Label>{remoteUsername}</Label>
          <Video ref={remoteVideoRef} autoPlay />
        </VideoWrapper>
      </VideoContainer>
      <Button onClick={handleLeaveRoom}>Выйти</Button>
    </div>
  );
};

export default Room;
