// ejemplo de paginacion no terminado

// import React, { useState } from 'react';

// const PaginationComponent = ({dataState, dataToShow}) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [objects, setObjects] = useState([dataState]); // Replace [...] with your actual list of objects

//   const objectsPerPage = 5;

// const getTotalPages = () => {
//   return Math.ceil(objects.length / objectsPerPage);
// };

// const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * objectsPerPage;
// const endIndex = startIndex + objectsPerPage;
// const displayedObjects = objects.slice(startIndex, endIndex);

//   // Other component logic...

//   return (
//     <div>
//       {displayedObjects.map((object, index) => (
//         // Render each object here
//       ))}

//       {/* Render pagination links */}
//       {Array.from({ length: getTotalPages() }).map((_, index) => (
//         <button key={index} onClick={() => handlePageChange(index + 1)}>
//           {index + 1}
//         </button>
//       ))}
//     </div>
//   );

// }

// export default PaginationComponent;
