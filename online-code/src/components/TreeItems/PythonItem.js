import React from 'react'
import { TreeItem  } from '@mui/x-tree-view/TreeItem';
import py from '../../ImageUtilities/pythonlogo.jpeg'
import Cookies from 'js-cookie'

const PythonItem = ({prname,setter,chlang}) => {

  
  function handleFileClick() {
    Cookies.set("file","python.py")
    const data = {
      email: Cookies.get("user"),
      prname:Cookies.get("lang")+","+Cookies.get("name"),
      file:prname+"."+"py"
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

          chlang("python")
  }

  return (
    <TreeItem itemId="index" onClick={handleFileClick} label={<div ><img className='langlogo' srcSet={py} alt='py' /> <span>{prname}.py</span> </div>} />
  )
}

export default PythonItem
