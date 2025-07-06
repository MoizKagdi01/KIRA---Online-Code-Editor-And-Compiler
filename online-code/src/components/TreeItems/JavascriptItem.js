import React from 'react'
import { TreeItem  } from '@mui/x-tree-view/TreeItem';
import JS from "../../ImageUtilities/jslogo.jpeg";
import Cookies from 'js-cookie'

const JavascriptItem = ({prname,setter,chlang}) => {

  
  
  function handleFileClick() {
    Cookies.set("file","scripts.js")
    const data = {
      email: Cookies.get("user"),
      prname:Cookies.get("lang")+","+Cookies.get("name"),
      file:prname+"."+"js"
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

          chlang("javascript")
  }


  
  return (
<TreeItem itemId="script" onClick={handleFileClick} label={<div> <img className='langlogo' srcSet={JS} alt='js' /> <span>{prname}.js</span></div>} />
 )
}

export default JavascriptItem
