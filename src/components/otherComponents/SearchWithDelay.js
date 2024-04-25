import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';


const SearchWithDelay = (props) => {
    const [searchText, setSearchText] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

  

    const handleSearch = (newText) => {
        if (newText.trim() !== '') {
           props.onFinalSearch(newText);
            //getSearchResult(searchText);
        }
    };

    const handleChange = (event) => {
       
        const newText = event.target.value;
        setSearchText(newText);
    
        // Clear any previous typing timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    
        if (newText.trim() !== '') {
            const newTypingTimeout = setTimeout(() => {
                // Use newText directly in the callback
                handleSearch(newText);
            }, 1000);
            setTypingTimeout(newTypingTimeout);
        } else {
            props.onFinalSearch('');
        }
    };
    
   


const handleClear = () => {
    setSearchText('');
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    props.onFinalSearch('');
};

useEffect(() => {
    // Clear the typing timeout when the component unmounts
    return () => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    };
}, []);

return (
    <div style={props.containerStyle}>
        <TextField

            variant="outlined"
          
          
            name={`search${Math.random()}`}
            placeholder="Search..."
            value={searchText}
            className={props.className}
            onChange={handleChange}
            fullWidth
            InputProps={{
                sx: { borderRadius: 0 },
                startAdornment: <SearchIcon />,
                endAdornment: (
                    props.isLoading ? 
                    <CircularProgress size={21}/> :
                    <ClearIcon
                        style={{ cursor: 'pointer' }}
                        onClick={handleClear}
                    />
                ),
            }}
        />
    </div>
);
};

export default SearchWithDelay;
