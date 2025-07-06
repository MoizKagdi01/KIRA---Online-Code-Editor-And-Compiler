
import React from 'react'
import { TreeItem  } from '@mui/x-tree-view/TreeItem';
import Css from '@mui/icons-material/Css';
import { cyan, yellow } from '@mui/material/colors'
import Cookies from 'js-cookie';

const CssItem = ({prname,setter,chlang}) => {

  function handleFileClick() {
    Cookies.set("file","styles.css")
    const data = {
      email: Cookies.get("user"),
      prname:Cookies.get("lang")+","+Cookies.get("name"),
      file:prname+"."+"css"
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

          chlang("CSS")
  }


  return (
<TreeItem onClick={handleFileClick} itemId="style" label={<div> <Css sx={{color:yellow[900],background:cyan[100]}} /> {prname}.css </div>} />
  )
}

export default CssItem
