import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CardHeader, Container, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';

function MyComponent() {

  const [open, setOpen] = React.useState(false);
  const [secondPage, setSecondPage] = React.useState(false);
  const [onePage, setOnePage] = React.useState(true);
  const [filters, setFilters] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [projectsOrg, setProjectsOrg] = useState([]);
  const [projects, setProjects] = useState([]);
  const [technicalSkillSetList, setTechnicalSkillSetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [items, setItems] = useState([{}]);
  const [frontEndList, setFrontEndList] = useState([{}]);
  const [dbList, setDbList] = useState([{}]);
  const [page, setPage] = React.useState(2);
  const [pageCount, setPageCount] = React.useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    console.log("hi")
    console.log(items);
    let listItme = [];
    axios.get('http://localhost:8080/api/getProjects')
      .then(response => {
        var dataa = response.data.projects;


        // Calculate the start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageItems = dataa.slice(startIndex, endIndex);
        setProjectsOrg(response.data.projects);
        setProjects(currentPageItems);

        var projects = response.data.projects.length;
        setPageCount(Math.round(projects / 10));
        console.log(Math.round(projects / 10), "projects");
        setTechnicalSkillSetList(response.data.technicalSkillSetList);
        for (let i = 0; i <= response.data.technicalSkillSetList.backendList.length; i++) {
          let it = {
            id: "be" + i,
            text: response.data.technicalSkillSetList.backendList[i],
            checked: false,
          }
          listItme.push(it);
        }
        setItems(listItme);
        listItme = []
        console.log(response.data, "data")
        for (let i = 0; i <= response.data.technicalSkillSetList.frontendList.length; i++) {
          let it = {
            id: "fe" + i,
            text: response.data.technicalSkillSetList.frontendList[i],
            checked: false,
          }
          listItme.push(it);
        }
        setFrontEndList(listItme);
        console.log(listItme, "frontend")
        listItme = []
        for (let i = 0; i <= response.data.technicalSkillSetList.databasesList.length; i++) {
          let it = {
            id: "db" + i,
            text: response.data.technicalSkillSetList.databasesList[i],
            checked: false,
          }
          listItme.push(it);
        }
        setDbList(listItme);
        console.log(listItme, "db")
        listItme = []
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const [selectedModel, setSelectedModel] = useState({});
  const handleOpen = (item: any) => {
    setOpen(true);
    setSelectedModel(item);
    console.log(item, "item");
  };
  const openProjectDetails = () => {
    setSecondPage(true);
    setOnePage(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenFilter = () => {
    setFilters(true);
  };
  const handleCloseFilter = () => {
    setFilters(false);
  };
  // const handleSearchChange = (event: any) => {
  //   const serachVal = event.target.value;
  //   console.log(serachVal);
  //   setSearchValue(serachVal);
  // }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageItems = projectsOrg.slice(startIndex, endIndex);
    setProjects(currentPageItems);

    var projects = projectsOrg.length;
    setPageCount(projects / 10);
    console.log(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = () => {
    setFilters(true);
  }



  const handleItemCheck = (itemm) => {
    console.log(itemm.checked ? "notselected" : "sele");
    // setItems((itemm) =>
    var a = dbList.map((item) =>
      item.id === itemm ? { ...item, checked: !item.checked } : item
    )
    setDbList(a);
    // );
  };

  const handleItemCheckFront = (itemm) => {
    console.log(itemm.checked ? "notselected" : "sele");
    // setItems((itemm) =>
    var a = frontEndList.map((item) =>
      item.id === itemm ? { ...item, checked: !item.checked } : item
    )
    setFrontEndList(a);
    // );
  };

  const handleItemCheckBack = (itemm) => {
    console.log(itemm.checked ? "notselected" : "sele");
    // setItems((itemm) =>
    var a = items.map((item) =>
      item.id === itemm ? { ...item, checked: !item.checked } : item
    )
    setItems(a);
    // );
  };

  const handleSearchValue = () => {
    console.log(frontEndList, "front");
    console.log(items, "items");
    console.log(dbList, "dbList");
    let frontList = [""]
    let beList = [""]
    let dbLst = [""]
    for (let i = 0; i < frontEndList.length; i++) {
      if (frontEndList[i].checked) {
        frontList.push(frontEndList[i].text);
      }
    }

    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        beList.push(items[i].text);
      }
    }
    
    for (let i = 0; i < dbList.length; i++) {
      if (dbList[i].checked) {
        dbLst.push(dbList[i].text);
      }
    }
    let data = {
      "backend":beList,
      "frontend": frontList,
      "databases":dbLst
    }
    axios.post('http://localhost:8080/api/getProjectsByTechnologies',data)
      .then(response => {
        if (response.data) {
          console.log(response.data)
          var dataa = response.data.projects;


        // Calculate the start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageItems = dataa.slice(startIndex, endIndex);
        setProjectsOrg(response.data.projects);
        setProjects(currentPageItems);

        var projects = response.data.projects.length;
        setPageCount(Math.round(projects / 10));
        console.log(Math.round(projects / 10), "projects");

        }
      })


  }

  const textStyle = {
    backgroundColor: '#80808038',
    width: '100%', // Set the background color
    fontWeight: 'bold',
    color: 'dark black',
    fontSize: '19px',
    textAlign: 'center',     // Make the text bold
  };

  const textStyleFor = {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',  // Set the font weight to 'bold'
  };

  return (
    <>
      {filters && (
        <>
          <Dialog sx={{ minHeight: "150px", minWidth: "400px", margin: "30px" }} open={filters} onClose={handleCloseFilter}>
            <div style={{ width: "300px", margin: "10px", padding: "10px" }}>
              <Accordion sx={{ padding: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Backend</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>
                      {items.map((item) => (
                        <><FormControlLabel
                          key={item.id}
                          control={<Checkbox
                            checked={item.checked}
                            onChange={() => handleItemCheckBack(item.id)}
                            name={`item-${item.id}`} />}
                          label={item.text} /><br /></>
                      ))}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ padding: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>FrontEnd</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>
                      {frontEndList.map((item) => (
                        <><FormControlLabel
                          key={item.id}
                          control={<Checkbox
                            checked={item.checked}
                            onChange={() => handleItemCheckFront(item.id)}
                            name={`item-${item.id}`} />}
                          label={item.text} /><br /></>
                      ))}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ padding: "10px" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>DataBases</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>
                      {dbList.map((item) => (
                        <><FormControlLabel
                          key={item.id}
                          control={<Checkbox
                            checked={item.checked}
                            onChange={() => handleItemCheck(item.id)}
                            name={`item-${item.id}`} />}
                          label={item.text} /><br /></>
                      ))}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Button sx={{ display: "flex", flexDirection: "row-reverse" }} onClick={handleSearchValue}>Search</Button>
            </div>
          </Dialog>
        </>
      )}

      {open && (<Dialog open={open} onClose={handleClose} >
        {/* <DialogTitle><p style={textStyle}>Details</p></DialogTitle> */}
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            <div>
              <p style={textStyle}>Title</p>
            </div>
            <span><li>{selectedModel.projectTitle}</li></span>
            <div>
              <p style={textStyle}>Project.Technologies</p>
            </div>
            <span><li>{selectedModel.projectTechnologies}</li></span>
            <br></br>
            <p style={textStyle}>Technical_Skillset.Frontend</p>
            <span><li>{selectedModel.technicalSkillSetFrontend ? selectedModel.technicalSkillSetFrontend : "N/A"}</li></span>
            <br></br>
            <p style={textStyle}>Technical_Skillset.Backend</p>
            <span><li>{selectedModel.technicalSkillSetBackend ? selectedModel.technicalSkillSetBackend : "N/A"}</li></span>
            <br></br>
            <p style={textStyle}>Technical_Skillset.DataBases</p>
            <span><li>{selectedModel.technicalSkillDatabases ? selectedModel.technicalSkillDatabases : "N/A"}</li></span>
            <br></br>
            <p style={textStyle}>Technical_Skillset.Infrastructure</p>
            <span><li>{selectedModel.technicalSkillSetInfrastructure ? selectedModel.technicalSkillSetInfrastructure : "N/A"}</li></span>
          </Typography>
        </DialogContent>
      </Dialog>)}

      {secondPage && (<><Grid item xs={12} sx={{ display: "flex", justifyContent: "end", flexDirection: "row-reverse" }}>
        <Button onClick={handleSearch}><SearchIcon /></Button>
        <Pagination count={15} page={currentPage} onChange={handleChangePage} />
        {/* <TextField id="search" type="search" label="search" value={searchValue} onChange={handleSearchChange}
      sx={{ ".MuiContainer-root": { color: "blue", borderRadius: "90px", maxWidth: "150 !important" }, width: 150, height: 50 }} size='small' InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        )
      }} /> */}
      </Grid><Grid container spacing={3} sx={{ marginTop: 5, padding: 2, backgroundColor: "lightblue" }}>
          {Array.isArray(projects) && projects.map((item: any) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345, minHeight: 600 }}>
                    <CardContent>
                      <CardActionArea onClick={() => handleOpen(item)}>
                        <div>
                          <p style={textStyle}>Title</p>
                        </div>
                        <span><li>{item.projectTitle}</li></span>
                        <div>
                          <p style={textStyle}>Project.Technologies</p>
                        </div>
                        <span><li>{item.projectTechnologies}</li></span>
                        <br></br>
                        <p style={textStyle}>Technical_Skillset.Frontend</p>
                        <span><li>{item.technicalSkillSetFrontend ? item.technicalSkillSetFrontend : "N/A"}</li></span>
                        <br></br>
                        <p style={textStyle}>Technical_Skillset.Backend</p>
                        <span><li>{item.technicalSkillSetBackend ? item.technicalSkillSetBackend : "N/A"}</li></span>
                        <br></br>
                        <p style={textStyle}>Technical_Skillset.DataBases</p>
                        <span><li>{item.technicalSkillDatabases ? item.technicalSkillDatabases : "N/A"}</li></span>
                        <br></br>
                        <p style={textStyle}>Technical_Skillset.Infrastructure</p>
                        <span><li>{item.technicalSkillSetInfrastructure ? item.technicalSkillSetInfrastructure : "N/A"}</li></span>
                      </CardActionArea>
                    </CardContent>
                  </Card></Grid>
              </>
            );
          })};
        </Grid></>)}
{onePage && (
 <Grid xs={12} sx={{textAlign: "center", alignContent:"center", justifyContent:"center", display: "flex", marginTop: "200px",}}>
 <Button sx={{ border: "2px solid grey",margin:0, padding: 0,alignItems: "center", display: "flex", justifyContent: "center"}}onClick={openProjectDetails}> Projet Deatils</Button>
</Grid>
)}
       
    </>
  )
}

export default MyComponent;

