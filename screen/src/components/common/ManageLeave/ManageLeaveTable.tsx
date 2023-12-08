import React, { useState } from "react";
import styles from "./ManageLeaveTable.module.scss";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";
import { BiRightArrow } from "react-icons/bi";
import SearchBox from "../searchBox/SearchBox";
import CommonButton from "../CommonButton/CommonButton";
import CustomLoader from "../../CustomLoader/CustomLoader";

export interface IManageLeaveTable {
  heading: string;
  query: any;
  setQuery: any;
  tableData: any;
  tableTitle: any;
  IsManageLeaveAction: boolean;
  leaveActionHandler?: any;
  editHandler?: any;
  deleteHandler?: any;
  handleAction?: any;
  newStatus?: string;
  loading: boolean;
}

const ManageLeaveTable = ({
  query,
  setQuery,
  heading,
  tableTitle,
  tableData,
  handleAction,
  loading
}: IManageLeaveTable) => {
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
            {tableData && tableData.filter((employee: { name: string }) => {
              return (
                query === "" ||
                (employee.name
                  ?.toLowerCase()
                  ?.includes(query.toLowerCase()) ??
                  false)
              );
            }).map((item: any, idx: number) => {
              return (
                <>
                  <TableRow key={idx}>
                    <TableCell>
                      <CommonButton name={item.emp_id} onClick={(() => console.log("hi"))} />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.leave_type}</TableCell>
                    <TableCell>{item.start_date}</TableCell>
                    <TableCell>{item.end_date}</TableCell>
                    <TableCell>{item.total_day}</TableCell>
                    <TableCell>{item.leave_reason}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className={styles.tableAction}>
                      <BiRightArrow
                        onClick={(() => handleAction(item._id))}
                        fontSize={30}
                      />
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>}
      </TableContainer>
    </Grid>
  );
};

export default ManageLeaveTable;
