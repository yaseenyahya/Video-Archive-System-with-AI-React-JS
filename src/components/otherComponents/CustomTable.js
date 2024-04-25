import React, { useCallback, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Button, IconButton, Container, Tooltip
} from '@mui/material';
import jspdf from "jspdf";
import 'jspdf-autotable';
import { makeStyles } from "@mui/styles";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as XLSX from 'xlsx'
const useStyles = makeStyles((theme) => ({

  addActionButton: {
    color: "#FFFFFF!important",
    [theme.breakpoints.down("md")]: {
      padding: "6px!important"
    }
  },
  toolbarContainer: {
    display: "flex!important",
    justifyContent: "space-between"
  },
  excelButton:{
    marginLeft:"auto"
  }
}));
const CustomTable = (props) => {
  const classes = useStyles();

  return (
    <>
      <MaterialReactTable
   
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',

            },
            size: 10,
          },
        }}
        columns={props.columns}
        data={props.data}
        enableColumnOrdering
        enableEditing={true}
        renderTopToolbarCustomActions={({ table }) => {
         return <Container disableGutters={true} maxWidth={false} className={classes.toolbarContainer}>
           {props.addDataText && <Button
              className={classes.addActionButton}
              onClick={props.addDataAction}
              variant="contained"
            >
              {props.addDataText}
            </Button>
          }
 
            <span className={classes.excelButton}>
            <Tooltip title={"Download Excel"}>
              <IconButton onClick={() => {
               const tableData = table.getPrePaginationRowModel().rows.map((row) => {
              
                return props.columns.map((col) => row.getValue(col.accessorKey));
              });
              
              const ws = XLSX.utils.aoa_to_sheet([props.columns.map((col) => col.header), ...tableData]);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
              XLSX.writeFile(wb, `${props.exportFilename}.xlsx`);
              }}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            </span>
            <Tooltip title={"Download PDF"}>
              <IconButton onClick={() => {
                 
                const unit = "pt";
                const size = "a4"; // use a1, a2, a3 or a4
                const orientation = "portrait"; // portrait or landscape

                const marginleft = 40;
                const doc = new jspdf(orientation, unit, size);

                const tableData = table.getPrePaginationRowModel().rows.map((row) => {
                  
                  console.log(row.getValue("moreInfo"))
                  return props.columns.map((col) => row.getValue(col.accessorKey));
                });
            
                doc.autoTable({
                  head: [props.columns.map((col) => col.header)],
                  body: tableData,
                  theme: 'striped',
                });
             
                doc.save(`${props.exportFilename}.pdf`)
              }}>
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
          </Container>
        }}
        {...props}
      />

    </>
  );
};


export default CustomTable;
