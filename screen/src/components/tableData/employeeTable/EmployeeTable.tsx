import React, { useState, useEffect } from "react";
import styles from "./EmployeeTable.module.scss";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdOutlineMode } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import CommonButton from "../../common/CommonButton/CommonButton";
import SearchBox from "../../common/searchBox/SearchBox";
import CustomLoader from "../../CustomLoader/CustomLoader";

export interface IEmployeeTable {
  heading: string;
  tableTitle: any;
  tableData: any;
  handleLeaveAction: any;
  handleEdit: any;
  handleDelete: any;
  setQuery: any;
  query: any;
  loading: boolean
}

const EmployeeTable = ({
  heading,
  query,
  setQuery,
  tableTitle,
  tableData,
  handleLeaveAction,
  handleEdit,
  handleDelete,
  loading
}: IEmployeeTable) => {
  return (
    <Grid className={styles.commonTableContainer}>
      <TableHead className={styles.tableHead}>
        <TableCell sx={{ fontSize: 20 }}>{heading}</TableCell>
        <TableCell sx={{ fontSize: 20 }}>
          <SearchBox setQuery={setQuery} />
        </TableCell>
      </TableHead>
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: "#58024B" }}>
            <TableRow>
              {tableTitle.map((item: any) => {
                return (
                  <TableCell style={{ color: "white" }}>{item.title}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer>
        {loading ? <CustomLoader /> : <Table>
          <TableBody>
            {tableData &&
              tableData
                .filter((employee: { name: string }) => {
                  return (
                    query === "" ||
                    (employee.name
                      ?.toLowerCase()
                      ?.includes(query.toLowerCase()) ??
                      false)
                  );
                })
                .map((item: any, idx: any) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <CommonButton
                          name={item.emp_id}
                          onClick={() => console.log("hi")}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.branch}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.designation}</TableCell>
                      <TableCell>{item.dateOfJoin}</TableCell>
                      <TableCell className={styles.tableAction}>
                        <MdOutlineMode onClick={handleEdit} fontSize={30} />
                        <RiDeleteBinLine
                          onClick={() => handleDelete(item._id)}
                          fontSize={30}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>}

      </TableContainer>
    </Grid>
  );
};

export default EmployeeTable;
