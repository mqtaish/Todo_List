import { Container } from "@mui/material";
import { TodoListApp } from "./components/TodoList";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { TodoContext } from "./contexts/TodosContext";
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MySnackBar from "./components/MySnackBar";
import { ToastProvider } from "./components/ToastContext";
import TodosProvider from "./contexts/TodosContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"],
  },

  palette: {
    primary: { main: "#b0bec5" },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "firstTask",
    details: "hegfidjgifjdgojfigjfig",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "secondTask",
    details: "okgfodgpfdgfg",
    isCompleted: false,
  },
];

function App() {

  return (

    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div className="App">
            <Container
              maxWidth="md"
              style={{
                background: "#eee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "100vh",
              }}
            >
              <TodoListApp></TodoListApp>
            </Container>
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
