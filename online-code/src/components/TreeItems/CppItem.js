
import React from 'react'
import { TreeItem  } from '@mui/x-tree-view/TreeItem';
import Cpp from "../../ImageUtilities/cpplogo.jpeg";
import Cookies from 'js-cookie';
const CppItem = ({prname,setter,chlang}) => {

  function handleFileClick() {

    Cookies.set("file","cpp.cpp")

    const data = {
      email: Cookies.get("user"),
      prname:Cookies.get("lang")+","+Cookies.get("name"),
      file:prname+"."+"cpp"
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

          chlang("cpp")
  }

  return (
    <div>
{/* <TreeItem itemId="style" label={<div> <img className='langlogo' src={Cpp} alt='cpp' /><span> {prname}</span></div>} /> */}
<TreeItem onClick={handleFileClick} itemId="cpp" label={<div><img className='langlogo' srcSet={Cpp} alt='cpp' /> <span>{prname}.cpp</span></div>} />
</div>

  )
}

export default CppItem
