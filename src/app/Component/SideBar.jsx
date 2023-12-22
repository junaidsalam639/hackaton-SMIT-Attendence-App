"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import "./custom.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const drawerWidth = 240;

const iconArray = [<AccountCircleIcon />, <AssignmentIcon />];

function SideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);

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
        axios.post('https://rose-rich-turtle.cyclic.app/addstudent/' , object).then((data) => {
            console.log(data);
            alert("User_Add_Successfully");
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useRouter();
  const handlePageClick = (page) => {
    console.log(page);
    const pages = page.toLowerCase();
    navigate.push(`/pages/${pages}`, { replace: true });
  };

  const handlerLogout = () => {
    localStorage.clear()
    navigate.push('/');
  }

  const drawer = (
    <div style={{ height: "100vh", backgroundColor: "#fff" }}>
      <Toolbar />
      <ListItemButton
        style={{ textAlign: "center", marginTop: "-20px", cursor: "pointer" }}
      >
        <h1 className="fw-bold text-2xl font-bold ml-16 font-sans">Logo</h1>
      </ListItemButton>
      <Divider style={{ borderBottom: "2px solid white" }} />
      <List className="mt-5">
        {["Students", "Attendance"].map((text, index) => (
          <ListItem key={text} disablePadding className="font-sans">
            <ListItemButton onClick={() => handlePageClick(text)}>
              <div className="bg-slate-200 mr-4 h-10 items-center flex w-10 rounded-full">
                <ListItemIcon className="text-[#5C93FA] pl-2">
                  {iconArray[index]}
                </ListItemIcon>
              </div>
              <ListItemText className="" primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        <button onClick={handlerLogout} className="mt-80 ml-12 text-2xl bg-[#5C93FA] px-3 py-2 text-white font-sans rounded-md hover:bg-blue-500">Logout</button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Divider />
      </Box>
      <List style={{ width: "530px" }}>
        <AvatarUploader />
        <h1
          style={{
            position: "relative",
            left: "10%",
            fontSize: "25px",
            top: "80px",
            fontWeight: "bold",
          }}
        >
          Add Student
        </h1>
        <KeyboardBackspaceIcon
          style={{ marginLeft: "20px", marginTop: "50px" }}
        />
      </List>

      {/* Rest of your code */}
      <div style={{ display: "flex" }}>
        <input
          type="text"
          className="Faiz ml-10"
          style={{ width: "40%" }}
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="text"
          className="Faiz ml-10"
          style={{ width: "40%" }}
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          className="Faiz ml-10"
          style={{ width: "40%" }}
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <input
          type="password"
          className="Faiz ml-10"
          style={{ width: "40%" }}
          placeholder="PAssword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="email"
          className="Faiz ml-10"
          style={{ width: "40%" }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          className="Faiz ml-10"
          style={{ width: "40%" }}
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button
        style={{ width: "400px" }}
        className=" rounded bg-[rgb(92,147,250)] p-2 text-white cursor-pointer ml-32 mt-5"
        onClick={handlerSubmit}
      >
        Add
      </button>
    </>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar
            style={{
              backgroundColor: "#f5f5f5",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              className="bg-[#5C93FA] text-white"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className="text-dark flex items-center"
              variant="h6"
              noWrap
              component="div"
            >
              <div className="bg-[#5C93FA] w-12 h-12  rounded-full flex items-center justify-center">
                <PermIdentityIcon className="text-white" />
              </div>
              <h1 className="mx-2 font-bold text-3xl font-sans text-black cursor-pointer">
                Students
              </h1>
            </Typography>
            <Typography variant="h6" noWrap component="div">
              {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <button
                    className="bg-[#5C93FA] text-md flex hover:bg-blue-500 items-center text-white px-3 rounded-md py-[7px] text-[14px]"
                    onClick={toggleDrawer(anchor, true)}
                  >
                    <ControlPointIcon className="mr-2" />
                    Add Students
                  </button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
              <div></div>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
        </Box>
      </Box>
    </>
  );
}

export default SideBar;
