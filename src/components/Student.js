import * as React from 'react';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, style} from '@mui/system';
import { Paper, Button } from '@mui/material';

export default function Student() {
    const paperStyle={
       padding:"50px 20px",
       width:"600px",
       margin:"20px auto"

    }

    const [name,setName]=useState('');
    const [address, setAddress]=useState('')
    const [student,setStudent]=useState([])

    const addChangeHandler=(e)=>{
      e.preventDefault();
      const student={name,address}
      console.log(student);

      fetch("http://localhost:8080/student/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
      }).then(()=>{
        console.log("New student added")
      })
      window.location.reload()
    }

    const editChangeHandler=(id)=>{
      
      fetch(`http://localhost:8080/student/get/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
      }).then(()=>{
        console.log("student updated")
      })
    }

    const deleteChangeHandler=(id)=>{
      console.log("button clicked");
      console.log(id)
      fetch(`http://localhost:8080/student/delete/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
      })
     .then(res=>res.json())
    .then(result=>{
    
     console.log(result);
    })
    window.location.reload()
    }

   useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
    .then(res=>res.json())
    .then(result=>{
      setStudent(result);
      
    })
    
   },[])
   
  return (
    <Container>
        <Paper elevations={3} style={paperStyle}>
            <h1 style={{color:"blue"}}>Add Students</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}/>
      <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}/> 
      
     
      <Button color="secondary" style={{"backgroundColor":"#C9302C","color":"white"}} onClick={addChangeHandler}>SUBMIT</Button>
    </Box>
    </Paper>

    <Paper elevation={3} style={paperStyle}>
      {student.map(student=>{
        return(
          <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left",color:"black"}} key={student.id}>
          Id:{student.id}<br/>
         
          Name:{student.name}<br/>
          Address:{student.address}
          <div style={{"padding":"20px 20px 20px 200px"}}>
          <Button color="secondary" style={{"backgroundColor":"#C9302C","color":"white","margin-right":"20px"}} onClick={()=>editChangeHandler(student.id)} ><a href={`/update/${student.id}`}>UPDATE</a></Button>
          
      <Button color="secondary" style={{"backgroundColor":"#C9302C","color":"white","margin-right":"20px"}} onClick={()=>deleteChangeHandler(student.id)}>DELETE</Button>
          </div>
          
        </Paper>
        
        )
      })}
      
    </Paper>
  
  
    
    </Container>
  );
}
