"use client";
import React , { useState , useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { List } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./custom.css";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function TableCenter() {
    const [data, setData] = useState([]);
      const [fname, setFname] = useState("");
      const [lname, setLname] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [number, setNumber] = useState("");
      const [course, setCourse] = useState("");
      const [image, setImage] = useState(null);
      const [id , setId] = useState('');

  useEffect(() => {
    axios
      .get("https://rose-rich-turtle.cyclic.app/addstudent")
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://rose-rich-turtle.cyclic.app/addstudent")
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const handlerDelete = (id) => {
    console.log(id);
    axios
      .delete(`https://rose-rich-turtle.cyclic.app/addstudent/${id}`)
      .then((data) => {
        alert("User_Delete Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const object = {
    image : image,
    fname : fname,
    lname : lname,
    course : course,
    password : password,
    email : email,
    number : number
  }

  const handlerSubmit = () => {
    if (
      fname == "" ||
      lname == "" ||
      email == "" ||
      password == "" ||
      number == "" ||
      course == "" ||
      image == null
    ) {
      alert("All fields are required");
    } else {
        axios.put(`https://rose-rich-turtle.cyclic.app/addstudent/${id}` , object).then((data) => {
            console.log(data);
            alert("User_Edit_Successfully");
            setFname('');
            setLname('');
            setEmail('');
            setPassword('');
            setNumber('');
            setImage('');
            setCourse('');
        }).catch((err)=> {
            console.log(err);
        })
    }
  };

  const AvatarUploader = () => {
    const handleImageUpload = () => {
      alert("Upload image logic goes here");
    };

    return (
      <div style={{ textAlign: "center" }}>
        <label
          htmlFor="imageInput"
          style={{ position: "relative", display: "inline-block" }}
        >
          {image ? (
            <div>
              <img
                src={image}
                alt="User Avatar"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  margin: "20px auto",
                  cursor: "pointer",
                }}
                onClick={handleImageUpload}
              />
              <span style={{ color: "black", fontSize: "20px" }}>Change</span>
            </div>
          ) : (
            <div>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/021/362/884/small/upload-icon-for-your-website-mobile-presentation-and-logo-design-free-vector.jpg"
                alt="User Avatar"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  margin: "20px auto",
                  cursor: "pointer",
                }}
              />
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                placeholder="choose your picture"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImage(reader.result);
                  };

                  if (file) {
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <span style={{ color: "black", fontSize: "20px" }}>Upload</span>
            </div>
          )}
        </label>
      </div>
    );
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
      setOpen(true);
       setId(id);
      axios
      .get(`https://rose-rich-turtle.cyclic.app/addstudent/${id}`)
      .then((data) => {
        const data2 = data.data.data
        console.log(data2);
        setFname(data2.fname);
        setLname(data2.lname);
        setCourse(data2.course);
        setEmail(data2.email);
        setNumber(data2.number);
        setPassword(data2.password);
        setImage(data2.image);
      })
      .catch((err) => {
        console.log(err);
      });
  } 
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="mx-auto container">
        <TableContainer component={Paper} className="w-10/12 mx-auto container">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Profile img</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Course Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {++index}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      src={row.image}
                      className="w-8 h-8 rounded-full float-right"
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="right">
                    {row.fname + " " + row.lname}
                  </TableCell>
                  <TableCell align="right">{row.course}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell
                    align="right"
                    className="h-16 flex items-center justify-around"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handlerDelete(row._id)}
                    >
                      <DeleteIcon />
                    </div>
                    <div className="cursor-pointer" onClick={() => handleOpen(row._id)}>
                      <EditIcon />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Model code start */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <List style={{ width: "" }}>
        <AvatarUploader />
        <h1
          style={{
            position: "relative",
            left: "10%",
            fontSize: "25px",
            top: "60px",
            fontWeight: "bold",
          }}
        >
          Edit Student
        </h1>
        <KeyboardBackspaceIcon
          style={{ marginLeft: "10px", marginTop: "30px" }}
        />
      </List>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             {/* Rest of your code */}
      <div style={{ display: "flex" }}>
        <input
          type="text"
          className="Faiz ml-2"
          style={{ width: "50%" }}
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="text"
          className="Faiz ml-2"
          style={{ width: "50%" }}
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          className="Faiz ml-2"
          style={{ width: "50%" }}
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <input
          type="password"
          className="Faiz ml-2"
          style={{ width: "50%" }}
          placeholder="PAssword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="email"
          className="Faiz ml-2"
          style={{ width: "50%" }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          className="Faiz ml-2"
          style={{ width: "50%" }}
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button
        style={{ width: "200px" }}
        className=" rounded bg-[rgb(92,147,250)] p-2 text-white cursor-pointer ml-44 mt-5"
        onClick={handlerSubmit}
      >
        Edit Student
      </button>
          </Typography>
        </Box>
      </Modal>
      {/* Model code End */}
    </>
  );
}


