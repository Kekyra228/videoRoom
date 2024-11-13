import styled from "styled-components";

export const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  padding: 20px;
`;

export const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
`;
export const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 25px;
  border: none;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;

  &:focus {
    outline: none;
    background-color: #ffffff;
  }
`;
export const Video = styled.video`
  width: 320px;
  height: 240px;
  border-radius: 20px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  background-color: #000;
`;

export const Label = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  color: #555;
  background: #ffffff99;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
`;

export const Button = styled.button`
  padding: 12px 32px;
  font-size: 16px;
  color: #ffffff;
  background-color: #ff6b6b;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #ff4d4d;
    transform: scale(1.05);
  }
`;
