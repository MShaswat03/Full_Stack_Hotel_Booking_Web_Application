// import React, {useRef, useState} from 'react'
// import { FaSearch } from 'react-icons/fa'
// import axios from 'axios';
// import './SearchBar.css'

// // const autocomplete_api = "http://localhost:3001/api/autocomplete?q="
// const autocomplete_api = "http://localhost:3001/api/autocomplete?term=";


// /** Component: Search bar
//  */
// function SearchBar({onChange, 'data-testid': testID}) {
//     const [results, setResults] = useState([]) // 5 results suggestion 
//     const [searchIn, setSearchIn] = useState("") // whatever is typed in search bar 
//     const uid = useRef(null) // update uid immediate since this value is not used for rendering 

//     // call api and set returned values to display in search suggestions div 
//     const fetchData = (value) => {
//         console.log("Querying: " + value);
//         axios.get(autocomplete_api + value).then((res) => { 
//             setResults(res.data)
//         })
//     }

   

//     // get req for search suggestions  
//     const handleChange = (value) => {
//         setSearchIn(value)
//         if (value === "") {
//             uid.current = null 
//             onChange(uid.current) // update formData in parent component with uid for GET req 
//         }
//         console.log(uid.current);
//         fetchData(value)
//     }

//     // pass fn as prop to child component SearchResults
//     const handleResultClick = (term, id) => {
//         setSearchIn(term); // update value in input field 
//         uid.current = id // update associated uid 
//         onChange(uid.current) // update formData in parent component with uid for GET req 
//     };

//     return (
//         <div className='search-bar-container'>
//             <div className="input-wrapper">
//                 <FaSearch></FaSearch>
//                 <input placeholder="Where to" type="text"  value={searchIn}
//                     onChange={(e) => {handleChange(e.target.value)}} data-testid={testID}/>
//             </div>
//             <SearchResults results={results} onResultClick={handleResultClick}></SearchResults>
//         </div>
//     )
// }

// function SearchResults({results, onResultClick}) {
//     return (
//         <div className="results-list" data-testid="results-list">
//             {   // must have unique id, put destination uid in key 
//                 results.map((result, id) => {
//                     return (
//                         <div key={result.uid} 
//                             className='search-result' 
//                             onClick={() => onResultClick(result.term, result.uid)}>
//                                 {result.term}
//                         </div>
//                     );
//                 })
//             }
//         </div>
//     )
// }



// export default SearchBar;

import React, { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './SearchBar.css';

const autocomplete_api = "http://localhost:3001/api/autocomplete?term=";

function SearchBar({ onChange, 'data-testid': testID }) {
  const [results, setResults] = useState([]);
  const [searchIn, setSearchIn] = useState("");
  const uid = useRef(null);

  const fetchData = (value) => {
    console.log("Querying: " + value);
    axios.get(autocomplete_api + value)
      .then((res) => {
        console.log("Received:", res.data); // ✅ THIS LINE IS INCLUDED
        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else {
          console.error("Expected array but got:", res.data);
          setResults([]);
        }
      })
      .catch((err) => {
        console.error("Autocomplete fetch error:", err);
        setResults([]);
      });
  };

  const handleChange = (value) => {
    setSearchIn(value);
    if (value === "") {
      uid.current = null;
      onChange(uid.current);
      setResults([]); // clear dropdown
      return;
    }
    fetchData(value);
  };

  const handleResultClick = (term, id) => {
    setSearchIn(term);
    uid.current = id;
    onChange(uid.current);
    setResults([]); // hide dropdown after click
  };

  return (
    <div className='search-bar-container'>
      <div className="input-wrapper">
        <FaSearch />
        <input
          placeholder="Where to"
          type="text"
          value={searchIn}
          onChange={(e) => handleChange(e.target.value)}
          data-testid={testID}
          autoComplete="off"
        />
      </div>
      {results.length > 0 && (
        <SearchResults results={results} onResultClick={handleResultClick} />
      )}
    </div>
  );
}

function SearchResults({ results, onResultClick }) {
  if (!Array.isArray(results)) return null;

  return (
    <div className="results-list" data-testid="results-list">
      {results.map((result) => (
        <div
          key={result.uid}
          className='search-result'
          onClick={() => onResultClick(result.term, result.uid)}
        >
          {result.term}
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
