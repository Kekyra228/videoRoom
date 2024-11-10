import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #333;
`;

export const Title = styled.h1`
  font-size: 40px;
  color: #4a4a4a;
  margin-bottom: 1rem;
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
