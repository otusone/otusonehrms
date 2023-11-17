import React, {useState} from "react";
import styles from "./LeaveActionModal.module.scss";
import { Box, Divider, Grid, Modal, Typography } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import CommonButton from "../common/CommonButton/CommonButton";

export interface ILeaveActionModal {
  open: boolean;
  clossModal: any;
  emp_id: any;
  name: any;
  leave_type:any;
  end_date:any;
  total_day:any;
  leave_reason:any;
  status:any;
  start_date:any;
}

// const data = [
//     {
//         "id": 1,
//         "title": "Employee",
//         "label": "	Julie Lynn"
//     },
//     {
//         "id": 2,
//         "title": "Leave Typ",
//         "label": "Casual Leave"
//     },
//     {
//         "id": 3,
//         "title": "Appplied",
//         "label": "Mar 4, 2023"
//     },
//     {
//         "id": 4,
//         "title": "Start Dat",
//         "label": "Mar 3, 2023"
//     },
//     {
//         "id": 5,
//         "title": "End Date",
//         "label": "Mar 5, 2023"
//     },
//     {
//         "id": 6,
//         "title": "Leave Rea",
//         "label": "	Lorem Ipsum, Or Lipsum"
//     },
//     {
//         "id": 7,
//         "title": "Status",
//         "label": "Reject"
//     }
// ]
const LeaveActionModal = ({
  open,
  emp_id,
  name,
  leave_type,
  start_date,
  end_date,
  total_day,
  leave_reason,
  status,

  clossModal,
}: ILeaveActionModal) => {

  const [newStatus, setNewStatus] = useState(status);

  const handleApprove = () => {
    setNewStatus("Approved");
  };


  const handleReject = () => {
    setNewStatus("Reject");
  };



  return (
    <Grid>
      <Modal open={open}>
        <Grid className={styles.leaveActionModal}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" fontSize={22}>
              Leave Action
            </Typography>
            <RxCross1 onClick={clossModal} cursor={"pointer"} fontSize={22} />
          </Box>
          <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
          <Grid container className={styles.leaveActionDetails}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={6} >
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    EMPLOYEE ID: <span>{emp_id}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    NAME: <span>{name}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Leave Reason <span>{leave_reason}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Total Days <span>{total_day}</span>
                  </Typography>
                </Grid>
               
                <Grid item sm={6}>
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Leave Type <span>{leave_type}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                   Start Date <span>{start_date}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    End Date: <span>{end_date}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    {/* Status <span>{status}</span> */}
                    Status <span>{newStatus}</span>
                  </Typography>
                </Grid>
              </Grid>
             
            </Grid>
          </Grid>
          <Box
            width={"fit-content"}
            marginInlineStart={"auto"}
            display={"flex"}
          >
            <CommonButton
              name={"Approved"}
              // onClick={() => console.log("approved")}
              onClick={() => {
                handleApprove();
                // clossModal(); 
              }}
            />
            <CommonButton
              name={"Reject"}
              onClick={() => {
                handleReject();
                // clossModal(); 
              }}
            />
          </Box>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default LeaveActionModal;
