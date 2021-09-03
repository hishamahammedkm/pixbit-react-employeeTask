import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { GridToolbarContainer } from "@mui/x-data-grid-pro";

import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import FormDialog from "../components/EditDesignation";
import { DataGrid } from "@mui/x-data-grid";
import { deleteDesignation, getDesignations } from "../store/slices/employeeSlice";
import AdminHeader from "../components/AdminHeader";

const defaultTheme = createTheme();

const useStyles = makeStyles(
    (theme) => ({
        paper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin: theme.spacing(12, 4, 3),
            padding: theme.spacing(3, 4),
        },
        title: {
            marginBottom: theme.spacing(3),

        },
        grid_items_left: {
            marginLeft: theme.spacing(3),
        },
        grid_items_right: {
            marginRight: theme.spacing(3),
        },
    }),
    { defaultTheme }
);

function RowMenuCell(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [designationId, setDesignationId] = useState(null);
    const dispatch = useDispatch()

    const { row, id } = props;

    const classes = useStyles();

    const handleEditClick = (row) => {
        setIsOpen(!isOpen);
        setDesignationId(row);
        console.log('select', row);

    };
    const handleDelete = (id) => {

        dispatch(deleteDesignation(id))
    }

    return (

        <div className={classes.root}>
            {isOpen && <FormDialog isOpen={isOpen} item={designationId} />}
            <IconButton
                color="inherit"
                className={classes.textPrimary}
                size="small"
                aria-label="edit"
                onClick={() => handleEditClick(row)}
            >
                <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
                color="inherit"
                size="small"
                aria-label="delete"
                onClick={() => handleDelete(row.id)}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </div>
    );
}

RowMenuCell.propTypes = {
    api: PropTypes.object.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default function Designations() {
    const isLoading = useSelector(state => state.employee.loading)
    // console.log('isLoading',isLoading);
    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDesignations())

    }, [isLoading])

    const designationData = useSelector(state => state.employee.designations)

    const rows = designationData.map((item, index) => {
        return { id: item.id, name: item.name };
    });

    const columns = [
        { field: "id", headerName: "Sl No", width: 280, },
        {
            field: "name",
            headerName: "Designation name",
            width: 700,
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: RowMenuCell,
            sortable: false,
            width: 100,
            headerAlign: "center",
            filterable: false,
            align: "center",
            disableColumnMenu: true,
            disableReorder: true,
        },
    ];

    return (
        <>
            <AdminHeader />
            <Paper className={classes.paper}>
                <Grid
                    container
                    className={classes.title}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item className={classes.grid_items_left}>
                        <Typography variant="h6" component="h1">
                            Designations List
                        </Typography>
                    </Grid>
                    <Grid item className={classes.grid_items_right}>
                        <GridToolbarContainer>
                            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                                <NavLink
                                    to="/adddesignation"
                                    className="link"
                                    style={{ color: "white" }}
                                    activeClassName="active"
                                >
                                    Add record
                                </NavLink>
                            </Button>
                        </GridToolbarContainer>
                    </Grid>
                </Grid>
                <div  style={{ height: 500, width: "100%" }}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
            </Paper>
        </>


    );
}