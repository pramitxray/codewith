import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, selectClasses } from '@mui/material';
import languageOptions from './languageOptions'; // Make sure the path is correct


import Select from 'react-select'

const transformedOptions = languageOptions.map(option => ({
    value: option.id,
    label: option.name,
}));
function PrintEditorContent() {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleMultiSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        //console.log(selectedOptions.value);
    };

    const [output, setOutput] = useState('');

    async function handleOnClick() {
        // Retrieve content from local storage
        var storedContent = localStorage.getItem('editorContent');
        // Convert the JSON object to a string
        // storedContent  = JSON.stringify(storedContent, null, 4);
        console.log(storedContent);


        const lang = selectedOptions.value;
        console.log(lang);
        const options = {
            method: 'POST',
            url: 'https://online-code-compiler.p.rapidapi.com/v1/',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '297f284233mshb46d835f69da66dp18aa49jsnd187e5bbfb2b',
                'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
            },
            data: {
                language: lang,
                version: 'latest',
                code: storedContent, // Use the stored content directly
                input: null
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setOutput(response.data.output)

        } catch (error) {
            throw error;
        }
    }

    return (
        <div className='OP'>

            <h1 className='custom_header '>Output</h1>

            <div className='OutpurDesign'>
                <Select options={transformedOptions} value={selectedOptions} onChange={handleMultiSelectChange} />
                <Button className='Conpiler' variant="outlined" color="success" onClick={handleOnClick}>
                    Compile
                </Button>
            </div>
            <h1 className='OutputArea'>{output}</h1>

        </div>
    );
}

export default PrintEditorContent;
