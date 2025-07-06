
import React from 'react'
import { TreeItem  } from '@mui/x-tree-view/TreeItem';
import C from "../../ImageUtilities/clogo.jpg";
import Cookies from 'js-cookie';
const CItem = ({prname,setter,chlang}) => {

  function handleFileClick() {

    Cookies.set("file","c.c")

    const data = {
      email: Cookies.get("user"),
      prname:Cookies.get("lang")+","+Cookies.get("name"),
      file:prname+".c"
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

          chlang("c")
  }

  return (
    <div>
{/* <TreeItem itemId="style" label={<div> <img className='langlogo' src={Cpp} alt='cpp' /><span> {prname}</span></div>} /> */}
<TreeItem onClick={handleFileClick} itemId="c" label={<div><img className='langlogo' srcSet={C} alt='cpp' /> <span>{prname}.c</span></div>} />
</div>

  )
}

export default CItem
