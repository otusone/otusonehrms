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

export interface IManageLeaveTable {
  heading: string;
  tableData: any;
  tableTitle: any;
  IsManageLeaveAction: boolean;
  leaveActionHandler?: any;
  editHandler?: any;
  deleteHandler?: any;
  handleAction?: any;
  newStatus?: string;
}

const ManageLeaveTable = ({
  heading,
  tableTitle,
  tableData,
  handleAction,
  newStatus,
}: IManageLeaveTable) => {
  return (
    <Grid className={styles.commonTableContainer}>
      <TableHead className={styles.tableHead}>
        <TableCell sx={{ fontSize: 20 }}>{heading}</TableCell>
        <TableCell sx={{ fontSize: 20 }}>
          <SearchBox />
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
          <TableBody>
            {tableData.map((item: any, idx: number) => {
              return (
                <>
                  <TableRow key={item.id}>
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
                        onClick={() => {
                          console.log(item.emp_id);
                          handleAction(item.emp_id);
                        }}
                        fontSize={30}
                      />
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ManageLeaveTable;
