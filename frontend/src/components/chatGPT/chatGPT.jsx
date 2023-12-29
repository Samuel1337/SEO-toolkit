import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const instance = axios.create({baseURL: 'http://localhost:3001'})

    const taylorResponse = (response) => {
        let array = response.split(" ");
        let objects = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] + " " + array[i+1] == "Page Name:") {
                objects.push({
                    "Page Name": "",
                    "Meta Title":"",
                    "Meta Description":"",
                    "Focus Keywords": ""
                });
                i++;
            }
            
        }

        if (response == '') {
            return null;
        } else {
            return "Taylored " + response;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await instance.post('/chatgpt', {prompt: input });
            setResponse(result.data.text);
        } catch (error) {
            console.error(error.response.data);
            setResponse('An error occurred while processing your request.');
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="input">Input:</label>
            <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
        <div>
            <h3>Response:</h3>
            {taylorResponse(response)}
        </div>
        </div>
    );
};

export default ChatGPT;