import React from 'react'
import { TreeItem  } from '@mui/x-tree-view/TreeItem';
import java from '../../ImageUtilities/javalogo.jpeg'
import Cookies from 'js-cookie'

const JavaItem = ({prname,setter,chlang}) => {

  Cookies.set("file","main.java")
  function handleFileClick() {
    const data = {
      email: Cookies.get("user"),
      prname:Cookies.get("lang")+","+Cookies.get("name"),
      file:prname+"."+"java"
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

          chlang("java")
  }
  return (
<TreeItem itemId="script" onClick={handleFileClick} label={<div><img className='langlogo' srcSet={java} alt='java' /> <span>{prname}.java</span></div>} />
 )
}
export default JavaItem
