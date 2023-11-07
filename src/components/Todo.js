import {
    Card,
    CardContent,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTodos } from "../contexts/TodosContext";
import { useToast } from "./ToastContext";
import { useTodosDispatch } from "../contexts/TodosContext";

export const Todo = ({ todo, showDialoge, showUpdateDialoge }) => {

    // const { todos, dispatch } = useTodos();
    const { showHideToast } = useToast();
    const dispatch = useTodosDispatch();

    const handleClick = () => {
        console.log(todo);
        dispatch({ type: "toggleCompleted", payload: todo })
        showHideToast("item has been checked")
    }

    const handleDeleteClick = () => {
        showDialoge(todo);
    }

    const handleUpdateClick = () => {
        showUpdateDialoge(todo);
    }

    return (
        <>

            <Card
                sx={{
                    minWidth: 275,
                    background: "#283593",
                    color: "white",
                    marginTop: "10px",
                }}
            >
                <CardContent >
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant="h5" sx={{ textAlign: "left" }}>
                                {todo.title}
                            </Typography>
                            <Typography variant="h6" sx={{ textAlign: "left" }}>
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <IconButton
                                aria-label="check"
                                style={{
                                    background: todo.isCompleted ? "#8bc34a" : "white",
                                    color: todo.isCompleted ? "white" : "#8bc34a",
                                    border: "3px solid #8bc34a",
                                }}
                                onClick={() => { handleClick() }}
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                aria-label="edit"
                                style={{
                                    background: "white",
                                    color: "#1769aa",
                                    border: "3px solid #1769aa",
                                }}
                                onClick={() => handleUpdateClick()}
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                aria-label="delete"
                                style={{
                                    background: "white",
                                    color: "#b23c17",
                                    border: "3px solid #b23c17",
                                }}
                                onClick={() => { handleDeleteClick() }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};
