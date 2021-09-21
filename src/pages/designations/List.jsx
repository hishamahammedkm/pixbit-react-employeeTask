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
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import FormDialog from "./Edit";
import { DataGrid } from "@mui/x-data-grid";


import Alert from "@material-ui/lab/Alert";
import Tab from "../../components/Tab";
import {
  useDeleteDesignationMutation,
  useGetDesignationsQuery,
} from "../../redux/services/employee";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {ThemeProvider, useTheme } from '@material-ui/core/styles';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      '& .super-app-theme--header': {
        // backgroundColor: 'gray',
        fontWeight: 'bold',
        fontSize: 'medium'
      },
      '& .MuiDataGrid-columnHeaderTitle	': {
        // fontSize: theme.spacing(1),
        fontWeight:'bold',
      }
    },






    paper: {
      display: "flex",

      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: theme.spacing(5, 4, 3),
      padding: theme.spacing(3, 4),
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(8, 4, 3),
      },
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    grid_items_left: {
      marginLeft: theme.spacing(0),
      [theme.breakpoints.down("md")]: {
        marginBottom: "10px",
      },
    },
    grid_items_right: {
      marginRight: theme.spacing(0),
    },
    th: {
      color: "red",
    },
  }),
  { defaultTheme }
);

function RowMenuCell(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [designationId, setDesignationId] = useState(null);
  const [deleteDesignation] = useDeleteDesignationMutation();
  const des = useGetDesignationsQuery();
  const dispatch = useDispatch();

  const { row, id } = props;

  const classes = useStyles();

  const handleEditClick = (row) => {
    setIsOpen(!isOpen);
    setDesignationId(row);
  };
  const handleDelete = async (id) => {
    try {
      const res = await deleteDesignation(id);

      history.push("/designations");
    } catch (error) { }
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const isLoading = useSelector((state) => state.employee.loading);
  const [designationData, setDesignationData] = useState([]);
  const { status: desStatus, data: desData } = useGetDesignationsQuery();

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (desStatus == "fulfilled") {
      setDesignationData(desData.data);
    }
  }, [desData]);

  const rows = designationData?.map((item, index) => {
    return { id: item.id, name: item.name, keys: index + 1 };
  });

  const columns = [
    {
      field: "keys",
      align: "right",
      headerAlign: "right",
      headerName: "Sl No",

      flex: 0.7,
      flex:1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "name",
      headerName: "Name",
      flex: 5,
   

      align: "left",
      headerAlign: "left",
      headerClassName: 'super-app-theme--header'
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: RowMenuCell,
      sortable: false,
      flex: 1,
      minWidth:100,
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
      headerClassName: 'super-app-theme--header'
    },
  ];

  return (
    <>

      <Tab tab={2} />

      <Paper className={classes.paper}>
        <Grid
          container
          className={classes.title}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item className={classes.grid_items_left}>
            <Typography variant="h5" component="h1">
              Designations
            </Typography>
          </Grid>
          <Grid item className={classes.grid_items_right}>
            <GridToolbarContainer>
              <NavLink
                to="/designation/create"
                className="link"
                style={{ color: "white", textDecoration: "none" }}
              // activeClassName="active"
              >
                {/* <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Create Designation
                </Button> */}
                         {
                  matches ?(<Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Create Designation
                  </Button>):(<Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Create
                </Button>)
                }
              </NavLink>
            </GridToolbarContainer>
          </Grid>
        </Grid>
        <div style={{ width: "100%" }} className={classes.root}>
          <DataGrid rows={rows} columns={columns} autoHeight />
        </div>
      </Paper>
    </>
  );
}
