import {
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Todo } from "./Todo";
import { useTheme } from '@mui/material/styles';
import { useToast } from "./ToastContext";
import { useTodos } from "../contexts/TodosContext";
import { useTodosDispatch } from "../contexts/TodosContext";


export const TodoListApp = () => {
    const { showHideToast } = useToast();
    const [inputTitle, setInputTitle] = useState("");
    const [displayedTodosType, setDisplayedTodosType] = useState("all");
    const [openUpdateDialoge, setOpenUpdateDialoge] = useState(false);
    const [dialogeTodo, setDialogeTodo] = useState(null);
    const [open, setOpen] = React.useState(false);
    const todos = useTodos();
    const dispatch = useTodosDispatch();
    // ---------------------------------------------------

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleDeleteClose = () => {
        setOpen(false);
    };

    const showDialoge = (todo) => {
        setOpen(true);
        setDialogeTodo(todo);
    }

    const showUpdateDialoge = (todo) => {
        setOpenUpdateDialoge(true);
        setDialogeTodo(todo);
    }

    const handleUpdateClose = () => {
        setOpenUpdateDialoge(false);
    };

    const handleUpdateDialoge = () => {

        dispatch({ type: "updated", payload: dialogeTodo })
        setOpenUpdateDialoge(false);
        showHideToast("Task Has Been Updated");

    }

    const handleDelete = () => {

        dispatch({ type: "deleted", payload: dialogeTodo })
        handleDeleteClose();
        showHideToast("Task Has Been Deleted");
    }

    // ------------------------------------------------------

    const handleAddNewTask = () => {
        dispatch({ type: "added", payload: { newTitle: inputTitle } })
        setInputTitle("");
        showHideToast("Task has been added");
    };

    useEffect(() => {
        dispatch({ type: "get" })
    }, []);

    const changeDisplayedType = (e) => {
        setDisplayedTodosType(e.target.value);
    }

    let todosToBeRendered = todos;

    // complteted todos

    const completedTodos = useMemo(() => {
        return todos.filter((t) => {
            return t.isCompleted;
        })
    }, [todos])

    // non-completed todos
    const nonCompletedTodos = useMemo(() => {
        return todos.filter((t) => {
            return !t.isCompleted;
        })
    }, [todos])


    if (displayedTodosType === "completed") {
        todosToBeRendered = completedTodos;
    } else if (displayedTodosType === "non-completed") {
        todosToBeRendered = nonCompletedTodos;
    } else {
        todosToBeRendered = todos;
    }
    const todosJsx = todosToBeRendered.map((t) => {
        return <Todo key={t.id} todo={t} showDialoge={showDialoge} showUpdateDialoge={showUpdateDialoge} />;
    });

    return (

        <>
            {/* Remove Dialoge */}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleDeleteClose}
                aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle id="responsive-dialog-title">
                    {"Alert"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are You sure do you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDeleteClose}>
                        Disagree
                    </Button>
                    <Button onClick={() => { handleDelete() }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {/*== Remove Dialoge ==*/}

            {/* Update Dialoge */}
            <Dialog

                open={openUpdateDialoge}
                onClose={handleUpdateClose}
                aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle id="responsive-dialog-title" style={{ padding: "20px" }}>
                    {"Enter new information you want to update"}
                </DialogTitle>


                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "20px" }}>
                    <TextField

                        autoFocus

                        margin="dense"
                        id="name"
                        label="Title"
                        type="Title"
                        variant="standard"
                        value={dialogeTodo?.title}
                        onChange={(e) => { setDialogeTodo({ ...dialogeTodo, title: e.target.value }) }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Details"
                        type="details"
                        variant="standard"
                        value={dialogeTodo?.details}
                        onChange={(e) => { setDialogeTodo({ ...dialogeTodo, details: e.target.value }) }}
                    />
                </div>

                <DialogActions>
                    <Button autoFocus onClick={handleUpdateClose}>
                        Disagree
                    </Button>
                    <Button onClick={() => { handleUpdateDialoge() }} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            {/*== Update Dialoge ==*/}

            <Container maxWidth="sm" >

                <Card
                    sx={{ minWidth: 275 }}
                    style={{
                        maxHeight: "80vh",
                        overflowY: "scroll",
                        padding: "30px"
                    }}
                >
                    <Typography variant="h6">My Task</Typography>
                    <ToggleButtonGroup exclusive aria-label="text alignment"
                        value={displayedTodosType}
                        onChange={changeDisplayedType}
                        color="primary"
                    >
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="completed">Complete</ToggleButton>
                        <ToggleButton value="non-completed">Uncomplete</ToggleButton>
                    </ToggleButtonGroup>

                    <Divider style={{ marginTop: "10px" }} />

                    {todosJsx}

                    <Grid container spacing={2} marginTop="10px">
                        <Grid
                            item
                            xs={8}
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <TextField
                                style={{ width: "100%" }}
                                id="outlined-basic"
                                label="Task"
                                value={inputTitle}
                                variant="outlined"
                                onChange={(e) => {
                                    setInputTitle(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Button
                                onClick={() => {
                                    handleAddNewTask();
                                }}
                                style={{ width: "100%", height: "100%" }}
                                variant="contained"
                                disabled={inputTitle.length === 0}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Container >
        </>
    );
};
