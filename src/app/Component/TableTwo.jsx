'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function TableTwo() {
    const [data , setData] = React.useState([]);

    React.useEffect(()=>{
        axios.get('https://rose-rich-turtle.cyclic.app/addstudent').then((data) => {
            setData(data.data);
            console.log(data.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

  return (
    <div className='mx-auto container'>
      <TableContainer component={Paper} className='w-10/12 mx-auto container'>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Profile img</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Course Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {++index}
                </TableCell>
                <TableCell align="right">
                  <img src={row.image} className='w-8 h-8 rounded-full float-right' alt="" />
                </TableCell>
                <TableCell align="right">{row.fname + " " +  row.lname}</TableCell>
                <TableCell align="right">{row.course}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
