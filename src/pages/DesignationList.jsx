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
import {
  deleteDesignation,
  getDesignations,
} from "../store/slices/employeeSlice";
import AdminHeader from "../components/AdminHeader";
import Alert from "@material-ui/lab/Alert";
import Tab from "../components/Tab";

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      "& .header": {
        // backgroundColor: "rgba(255, 7, 0, 0.55)",

        display: "flex",

        justifyContent: "space-evenly",
        fontSize: "20px",
        fontWeight: "100",
        fontWeight: "900",
      },

      "& .super-app-theme--cell": {
        textAlign: "center",
        display: "flex",
        justifyContent: "space-evenly",
        // backgroundColor: "rgba(255, 7, 0, 0.55)",
      },
      "& .MuiDataGrid-columnHeaderWrapper": {},
      // display: "flex",
      // flexDirection: "row",
      // justifyContent: "spaceEvenly",
      // alignItems: "spaceEvenly",
      // cellClassName: 'super-app-theme--cell
    },
    paper: {
      display: "flex",

      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: theme.spacing(12, 4, 3),
      padding: theme.spacing(3, 4),
      marginTop: "-5px",
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
    th: {
      color: "red",
    },
  }),
  { defaultTheme }
);

function RowMenuCell(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [designationId, setDesignationId] = useState(null);
  const dispatch = useDispatch();

  const { row, id } = props;

  const classes = useStyles();

  const handleEditClick = (row) => {
    setIsOpen(!isOpen);
    setDesignationId(row);
    console.log("select", row);
  };
  const handleDelete = (id) => {
    dispatch(deleteDesignation(id));
  };

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
  const isLoading = useSelector((state) => state.employee.loading);
  // console.log('isLoading',isLoading);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDesignations());
  }, [isLoading]);

  const designationData = useSelector((state) => state.employee.designations);

  const rows = designationData.map((item, index) => {
    return { id: item.id, name: item.name, keys: index + 1 };
  });

  const columns = [
    {
      field: "keys",

      headerName: "Sl No",
      width: 280,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "name",
      headerName: "Designation name",
      width: 700,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: RowMenuCell,
      sortable: false,
      width: "100",
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  return (
    <>
      {/* <AdminHeader /> */}
      <Tab tab={1} />

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
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                <NavLink
                  to="/adddesignation"
                  className="link"
                  style={{ color: "white", textDecoration: "none" }}
                  activeClassName="active"
                >
                  Add record
                </NavLink>
              </Button>
            </GridToolbarContainer>
          </Grid>
        </Grid>
        <div style={{ height: 800, width: "100%" }} className={classes.root}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            // autoPageSize
            // density="comfortable"
          />
        </div>
      </Paper>
    </>
  );
}
