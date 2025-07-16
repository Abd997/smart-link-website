import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  font-size: 15px;
  color: #444;
  margin-bottom: 6px;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 18px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 15px;
  background: #fff;
  transition: border-color 0.2s;
  &:focus {
    border-color: #0969da;
    outline: none;
  }
  &:disabled {
    background: #f3f4f6;
  }
`

export const ErrorComponent = styled.div`
  color: #d32f2f;
  background: #fff0f0;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`

export const Success = styled.div`
  color: #22c55e;
  background: #f0fff4;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #0969da;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:not(:disabled) {
    background: #0554b3;
  }
  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
`
