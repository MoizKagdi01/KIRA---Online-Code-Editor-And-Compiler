import React from 'react'
import { TreeItem  } from '@mui/x-tree-view/TreeItem';
import Html from '@mui/icons-material/Html';
import { cyan, yellow } from '@mui/material/colors'
import Cookies from 'js-cookie';

const HtmlItem = ({prname,setter,chlang}) => {

  function handleFileClick() {
    Cookies.set("file","index.html")
    const data = {
      email: Cookies.get("user"),
      prname:Cookies.get("lang")+","+Cookies.get("name"),
      file:prname+"."+"html"
    }    
        fetch('http://localhost:5000/sendfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then((result) => {
            setter(result.fileContent)
          })
          .catch((error) => {
            console.error('Error:', error);
          });

          chlang("html")
  }


  return (
    <TreeItem itemId="index" onClick={handleFileClick} label={<div > <Html className='px-1' sx={{color:cyan[100],background:yellow[900]}} />{prname}.html </div>} />
  )
}

export default HtmlItem
