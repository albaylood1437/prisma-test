import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import {
  deleteRegister,
  getRegister,
  postRegister,
  updateRegister,
} from "../services/registerService";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SingUp from "./register";
import Search from "./search";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    paddingLeft: 250,
    paddingRight: 250,
    paddingTop: 100,
  },
  delete: {
    cursor: "pointer",
    marginLeft: "1rem",
  },
  edit: {
    cursor: "pointer",
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const [registered, setBooking] = useState([]);
  const [value, setValue] = useState("");
  const [row, setRow] = useState(null);

  const isAddMode = "edit";
  console.log("row", row);

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await getRegister();
      setBooking(data);
    };
    fetchBooking();
  }, []);

  const isSearched = (value) => (row) =>
    row.fname.toLowerCase().includes(value.toLowerCase());

  const handleDelete = async (id) => {
    try {
      const newArry = registered.filter((regis) => regis.id !== id);
      setBooking(newArry);
      await deleteRegister(id);
    } catch (err) {
      console.log(err);
    }
  };

  function handleSubmit(data) {
    if (row && row.id !== null) {
      updateUser(row, data);
    } else {
      createUser(data);
    }
  }

  const createUser = async (row) => {
    try {
      const { data } = await postRegister(row);
      const newArray = [...registered, data];
      setBooking(newArray);
    } catch (err) {
      console.log("err");
    }
  };

  const updateUser = async (row, mydata) => {
    try {
      const { data } = await updateRegister(row.id, mydata);
      const updatedData = [...registered];
      const index = updatedData.indexOf(row);
      updatedData[index] = { ...data };
      setBooking(updatedData);
    } catch (err) {
      console.log("error");
    }
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
    }
  };

  // const hanleUpdate = async (id) => {
  //   // try {
  //   //   const { data } = await updateRegister(id);
  //   //   const updateData = [...registered];
  //   //   const index = updateData.indexOf(dataIndex);
  //   //   updateData[index] = { ...data };
  //   // } catch (err) {
  //   //   console.log("err");
  //   // }

  //   console.log("updated");

  // const handleUpdate = async ({ row, id, dataindex }: any) => {
  //   try {
  //     const { data } = await updateDonor({ row, id });
  //     const state = [...donors];
  //     const index = state.indexOf(dataindex);
  //     state[index] = { ...data };
  //     setDonorData(state);
  //     handleClick("Sucessfully updated!");
  //   } catch (err) {
  //     handleClick("err!");
  //     setErrors(err.message);
  //   }
  // };

  console.log("come from register", registered);
  return (
    <div>
      <SingUp onSubmit={handleSubmit} row={row} />
      <Box p={1} flexGrow={1}>
        <Search value={value} onChange={handleChange} by="Blood Type" />
      </Box>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">First name</TableCell>
              <TableCell align="right">Second name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">password</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registered.filter(isSearched(value)).map((row) => (
              <TableRow key={row.id}>
                <TableCell align="right">{row.fname}</TableCell>
                <TableCell align="right">{row.sname}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.pswd}</TableCell>
                <TableCell align="right">
                  <EditIcon
                    name={isAddMode}
                    className={classes.edit}
                    onClick={() => setRow(row)}
                  />
                  <DeleteIcon
                    className={classes.delete}
                    onClick={() => handleDelete(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
