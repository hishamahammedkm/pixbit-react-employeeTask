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

import FormDialog from "../designations/Edit";
import { DataGrid } from "@mui/x-data-grid";

import AdminHeader from "../../components/AdminHeader";
import Tab from "../../components/Tab";
import {
  useGetDesignationsQuery,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "../../redux/services/employee";
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
      // margin: theme.spacing(12, 4, 3),
      padding: theme.spacing(3, 4),
      marginTop: "-5px",
      [theme.breakpoints.down('md')]: {
        marginTop: "15px",
      },
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
    createBtn: {
      width: '25px',
      height: '25px'

    }
  }),
  { defaultTheme }
);

function RowMenuCell(props) {
  useEffect(() => {
    // dispatch(getEmployees());
  }, []);
  // console.log('=======',props);
  const [isOpen, setIsOpen] = useState(false);
  const [designationId, setDesignationId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const employeeData = useGetEmployeesQuery();

  const { row, id } = props;
  // console.log(row);
  const classes = useStyles();

  const handleEditClick = (row) => {
    history.push(`/employees/${row.id}/edit`);


  };
  const handleDelete = async (row) => {
    try {
      const res = await deleteEmployee(row);

      history.push("/employees");
    } catch (error) {
      console.log(error);
    }

    // dispatch(deleteEmployee(row));
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
  // const { isLoading, data, isError } = useGetEmployeesQuery();
  const { status, data,isLoading} = useGetEmployeesQuery();
  const { status: desStatus, data: desData } = useGetDesignationsQuery();

  const classes = useStyles();
  const dispatch = useDispatch();

  const [employees, setEmployees] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  useEffect(() => {
    if (status == "fulfilled") {
      setEmployees(data.data);
    }
  }, [isLoading,data]);
  useEffect(() => {
    if (desStatus == "fulfilled") {
      setDesignationData(desData.data);
    }
  }, [desData]);

  console.log("designationData", designationData);
  console.log("employees", employees);
  var newData = [];
  employees.map((emp) => {
    const designation_id = emp.designation_id;
    var obj = { ...emp };
    designationData.map((des) => {
      const designation = des.id;
      if (designation_id == designation) {
        // emp.designation_id = des.name;
        obj.designation_id = des.name;
      }
    });
    newData.push(obj);
  });

  console.log("new Data-----", newData);
  const rows = newData.map((item, index) => {
    return {
      id: item.id,
      keys: index + 1,
      first_name: item.first_name,

      join_date: new Date(item.join_date).toLocaleDateString(),

      date_of_birth: new Date(item.date_of_birth).toLocaleDateString(),
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
      field: "keys",
      headerName: "Sl No",
      width: 150,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 200,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "join_date",
      headerName: "Join Date",
      width: 150,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      width: 200,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "designation_id",
      headerName: "Designation",
      headerAlign: "center",
      width: 200,
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerAlign: "center",
      // align: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      width: 200,
      headerAlign: "center",
      headerClassName: "header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "resume",
      headerName: "Resume",
      width: 150,
      align: "center",
      headerAlign: "center",
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

              <NavLink
                to="/create_employee"
                className="link"

                style={{ color: "white", textDecoration: "none" }}
                activeClassName="active"
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </NavLink>
            </GridToolbarContainer>
          </Grid>
        </Grid>
        <div
          className={classes.border}
          style={{ width: "100%" }}
          className={classes.root}
        >
          <DataGrid rows={rows} columns={columns} autoHeight />
        </div>
      </Paper>
    </>
  );
}
