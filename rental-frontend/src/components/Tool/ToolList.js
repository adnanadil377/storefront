// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import ToolListCard from './ToolListCard';

// function ToolList({ token }) {
//   const [tools, setTools] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:8000/api/tools/')
//       .then((res) => {
//         setTools(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   const rentTool = (toolId) => {
//     console.log(toolId)
//     console.log(token)
//     axios
//       .post(`http://localhost:8000/api/tools/${toolId}/rent/`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         alert('Tool rented successfully!');
//         // Update the tool list
//         setTools((prevTools) =>
//           prevTools.map((tool) =>
//             tool.id === toolId ? { ...tool, availability: false } : tool
//           )
//         );
//       })
//       .catch((err) => {
//         console.error(err);
//         // console.error(err.response ? err.response.data : err);
//         alert('Failed to rent tool.');
//       });
//   };

//   return (
//     <div className='p-10'>
//       <h1 className='text font-bold text-5xl text-fuchsia-950 ml-10'>Available Tools</h1>
//       <div className='grid grid-row gap-4 md:grid-cols-3'>
//         {tools.map((tool) => (
//           <ToolListCard tl={tool} tk={token} rt={rentTool} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ToolList;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ToolListCard from './ToolListCard';

function ToolList({ token }) {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/tools/')
      .then((res) => {
        setTools(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const rentTool = (toolId) => {
    axios
      .post(
        `http://localhost:8000/api/tools/${toolId}/rent/`,
        { customer_id: 1 }, // include customer ID in the request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert('Tool rented successfully!');
        setTools((prevTools) =>
          prevTools.map((tool) =>
            tool.id === toolId ? { ...tool, availability: false } : tool
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to rent tool.');
      });
  };

  return (
    <div className='p-10 bg-opacity-40'>
      <h1 className='text font-bold text-5xl text-fuchsia-950 ml-10'>Available Tools</h1>
      <div className='grid grid-row gap-4 md:grid-cols-3 bg-opacity-30'>
        {tools.map((tool) => (
          <ToolListCard tl={tool} tk={token} rt={() => rentTool(tool.id)} />
        ))}
      </div>
    </div>
  );
}

export default ToolList;
