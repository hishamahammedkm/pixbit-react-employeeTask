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

import FormDialog from "../components/EditDesignation";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteEmployee,
  getDesignations,
  getEmployees,
} from "../store/slices/employeeSlice";
import AdminHeader from "../components/AdminHeader";
import Tab from '../components/Tab'
const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      "& .header": {
        // backgroundColor: 'rgba(255, 7, 0, 0.55)',
        // fontSize:'20px',

        fontWeight: "900",
      },
      "& .super-app-theme--cell": {
        textAlign: "center",
      },
      // cellClassName: 'super-app-theme--cell
    },
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: theme.spacing(12, 4, 3),
      padding: theme.spacing(3, 4),
      marginTop:'-5px'
    },
    root: {
      "& .header": {
        //   backgroundColor: 'rgba(255, 7, 0, 0.55)',
        fontSize: "16px",
        fontWeight: "100",
      },
      "& .super-app-theme--cell": {
        textAlign: "center",
      },
      // cellClassName: 'super-app-theme--cell
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
  useEffect(() => {
    dispatch(getEmployees());
  }, []);
  // console.log('=======',props);
  const [isOpen, setIsOpen] = useState(false);
  const [designationId, setDesignationId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { row, id } = props;
  // console.log(row);
  const classes = useStyles();

  const handleEditClick = (row) => {
    history.push(`/employeelist/edit/${row.id}`);

    // setIsOpen(!isOpen);
    // setDesignationId(row);
    // console.log('select', row);
    // // console.log(rows);
  };
  const handleDelete = (row) => {
    console.log(row);

    dispatch(deleteEmployee(row));
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

export default function EmployeesList() {
  const employeesLoading = useSelector(
    (state) => state.employee.employeesLoading
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employee.employees);
  const designationData = useSelector((state) => state.employee.designations);
  console.log("employees", employees);
  console.log("designationData", designationData);
  const newEmployees = employees.map((employee) => {
    return {
      ...employee,
      designation_id: "java",

      // designation_id: designationData.map(
      //   (des) => des.id === employee.designation_id
      // ),
    };
  });
  console.log("newEmployees", newEmployees);
  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getDesignations());
  }, [employeesLoading]);

  const rows = newEmployees.map((item, index) => {
    return {
      id: item.id,
      first_name: item.first_name,
      join_date: item.join_date,
      date_of_birth: item.date_of_birth,
      gender: item.gender,
      designation_id: item.designation_id,
      // designation_id: item.id,

      email: item.email,
      profile_picture: item.profile_picture,
      resume: item.resume,
    };
  });

  const columns = [
    {
      field: "id",
      headerName: "Sl No",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "join_date",
      headerName: "Join Date",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "designation_id",
      headerName: "Designation",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "resume",
      headerName: "Resume",
      width: 150,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
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
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  return (
    <>
      {/* <AdminHeader /> */}
      <Tab tab={0} />
      <Paper className={classes.paper}>
        <Grid
          container
          className={classes.title}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item className={classes.grid_items_left}>
            <Typography variant="h6" component="h1">
              Employees
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
                  to="/addemployee"
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
        <div
          className={classes.border}
          style={{ height: 500, width: "100%" }}
          className={classes.root}
        >
          <DataGrid rows={rows} columns={columns} />
        </div>
      </Paper>
    </>
  );
}
