import React, { useState, useRef, useEffect } from 'react';
import { Button, Grid, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem  } from '@mui/x-tree-view/TreeItem';
import { Folder, SearchOutlined} from '@mui/icons-material';
import Cookies from 'js-cookie'
import HtmlItem from './TreeItems/HtmlItem';
import CssItem from './TreeItems/CssItem';
import JavascriptItem from './TreeItems/JavascriptItem';
import JavaItem from './TreeItems/JavaItem';
import PythonItem from './TreeItems/PythonItem';
import CppItem from './TreeItems/CppItem';
import CItem from './TreeItems/CItem';
import Editor from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';

import { GoogleGenerativeAI } from "@google/generative-ai";

const Main = ({theme}) => {
  
  const nav = useNavigate();
  const [dir, setDir] = useState([]);
  const [searchAI, setSearchAI] = useState('');

function handleDir(value) {
  setDir(value)
}
  useEffect(()=>{

if (!Cookies.get("user")) {
  nav("/login")
} 
else {
  fetch('http://localhost:5000/folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": Cookies.get("user"),
      "prname": Cookies.get("lang") + "," + Cookies.get("name")
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    handleDir(result)
  })
  .catch((error) => {
  }); 
}
  
}
// eslint-disable-next-line
,[])

  const [code, setCode] = useState('');
  const [lang, setLang] = useState(Cookies.get("lang"));
  const view = 'preview'
  // Refs for the panels and gutter
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const gutterRef = useRef(null);
  
  const [leftPanelWidth, setLeftPanelWidth] = useState(60); // Percentage width for left panel

  const deepRunCode = () => {
  fetch('http://localhost:5000/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email":Cookies.get("user"),
      "prname":Cookies.get("lang")+","+Cookies.get("name"),
      "file":Cookies.get("file"),
      "code":code,
      "language":Cookies.get("lang"),
      "input":document.getElementById("input").value
  })
    })
  .then(response => response.json())
  .then((result) => {
    if (view === 'preview') {
      let showData = ""
      if (result.stdout) {
        showData = `<br>Output : ${result.stdout.replaceAll("\n","<br>")} <br>Memory taken : ${result.memory} bytes <br>Time taken : ${result.time*1000} ms ( milli seconds ) <br>`
      } else {
        document.getElementById("output-interface").innerHTML=result.stderr
        showData = `<br>Error : ${result.error} <br><br>Memory taken : Null <br><br>Time taken : Null`
      }

        document.getElementById("output-interface").innerHTML= showData
    }
  })
  .catch((error) => {
  });
  }
  const runCode = () => {
  fetch('http://localhost:5000/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'base64_encoded':true
    },
    body: JSON.stringify({
      "email":Cookies.get("user"),
      "prname":Cookies.get("lang")+","+Cookies.get("name"),
      "file":Cookies.get("file"),
      "code":code,
      "language":Cookies.get("lang"),
      "input":document.getElementById("input").value,
      "base64_encoded":true
  })
    })
  .then(response => response.json())
  .then((result) => {
    if (view === 'preview') {
      if (result.stdout) {
        document.getElementById("output-interface").innerHTML=result.stdout.replaceAll("\n","<br>")
      } 
      else if (result.compile_output) {
        document.getElementById("output-interface").innerHTML=result.compile_output
      }
      else {
        document.getElementById("output-interface").innerHTML=result.error
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 10 && newWidth < 90) {
        setLeftPanelWidth(newWidth); // Update the width percentage for the left panel
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    const handleMouseDown = (e) => {
      e.preventDefault();
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
    if (gutterRef.current) {
      gutterRef.current.addEventListener('mousedown', handleMouseDown);
    }
    return () => {
      if (gutterRef.current) {// eslint-disable-next-line
        gutterRef.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, []);
  function handleCodeChange(value) {
    setCode(value || '')
      fetch('http://localhost:5000/updatecontent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email":Cookies.get("user"),
          "prname":Cookies.get("lang")+","+Cookies.get("name"),
          "file":Cookies.get("file"),
          "content":value
        }),
      })
        .then(response => response.json())
        .then((result) => {
          if (result.error) {
            console.error("Error updating content:", result.error);
          } else {
            
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }

  async function handleAiSearch() {
    if (searchAI) {
      const genAI = new GoogleGenerativeAI("AIzaSyA6_mpwEw-KHEnx0iAR0tveWeFJ6wFfWeA");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = "write me only code for "+searchAI+" language without any explanation";
      const lang = searchAI.split(" ")[searchAI.split(" ").length-1]
      const result = await model.generateContent((prompt.replace("```"+Cookies.get("lang")+"","")).replace("```",""));
      handleCodeChange(result.response.text().replaceAll("```"+lang+"","").replaceAll("```",""));
    } 
    else {
      alert("Prompt is required")
    }
  }



  return (
    <div className="h-screen flex flex-col" style={{height:"100%"}}>
      <Box sx={{position:"absolute"}}>
      <TextField label="Search AI" onChange={(event)=>{setSearchAI(event.target.value || '')}} value={searchAI} sx={{width:"30vw",margin:1}} color='error' variant='outlined' ></TextField>
        <IconButton onClick={handleAiSearch} sx={{marginTop:"2vh"}} className='bg-green-600'><SearchOutlined  /></IconButton>
        </Box>
      <div className="flex justify-center items-center p-4 bg-secondary">
        <Button className='bg-green-700 text-white hover:bg-green-900' onClick={runCode}>Run</Button>
        <Button className='bg-green-700 mx-4 text-white hover:bg-green-900' onClick={deepRunCode}>Deep Run</Button>
      </div>
      <Grid container className="flex flex-1" style={{height:"100%"}}>
        <Grid item xs={4} sm={2}
          ref={leftPanelRef}
          style={{ width: `${leftPanelWidth/4}%` , height:"100%" }}
        >

{/* tool box  */}

        <Box sx={{ minHeight: 352, minWidth: 100 }}>
          <SimpleTreeView>
          <TreeItem style={{color:"white"}} itemId="html" label={<div> <Folder color="warning" /> {Cookies.get("name")} </div>}>
{
dir.map((file)=>{
  switch (file.lang) {
    case "java":
      return (<JavaItem prname={file.name} key={file.name} setter={setCode} chlang={setLang} />)
  
    case "py":
      return <PythonItem prname={file.name} key={file.name} setter={setCode} chlang={setLang} />
  
    case "cpp":
      return (<CppItem prname={file.name} key={file.name} setter={setCode} chlang={setLang} />) 
  
    case "c":
      return (<CItem prname={file.name} key={file.name} setter={setCode} chlang={setLang} />) 
  
    case "html":
      return <HtmlItem prname={file.name} key={file.name} setter={setCode} chlang={setLang} />
  
    case "css":
      return <CssItem prname={file.name} key={file.name} setter={setCode} chlang={setLang} />
  
    case "js":
      return <JavascriptItem prname={file.name} key={file.name} setter={setCode} chlang={setLang} />
  
    default:
      break;
  }
  return null
})
}            
            </TreeItem>
          </SimpleTreeView> 
        </Box>


        </Grid>
        <Grid item xs={8} sm={7}
          ref={leftPanelRef}
          style={{ width: `${leftPanelWidth}%`,height:"100%"}}
        >
          <Editor
            height="80vh"
            style={{marginTop:"5px"}}
            language={lang}
            value={code}
            onChange={handleCodeChange}
            theme={`vs-${theme?"dark":"light"}`}
            id="editor"
          />
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} sm={3}
          ref={rightPanelRef}
          style={{ width: `${100 - leftPanelWidth}%`,height:"100%"}}
          className='bg-black text-black'
        >
          <div className="flex-1 bg-black overflow-auto">
            {view === 'preview' ? (
              <div
                className="w-full h-full bg-black border p-4"
                style={{ overflow: 'auto', backgroundColor: '#f5f5f5',height:"80vh" }}
              >
                OUTPUT<hr backgroundColor="black" /><div 
              id='output-interface' style={{height:"50vh",overflow:"scroll"}}></div>
              
            <div backgroundColor="black">
              <hr />
              INPUT <hr/>
              <textarea className='border-2 w-full' name='input' id='input' style={{height:"18vh"}}></textarea>
            </div>
              </div>
            ) : (
              <pre className="bg-black text-green-400 h-full overflow-auto"></pre>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
