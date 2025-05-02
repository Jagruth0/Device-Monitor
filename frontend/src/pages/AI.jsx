import { useState } from 'react';
import axios from 'axios';

function AI() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [output, setOutput] = useState('');
    
    const askAI = async () => {
    const res = await axios.post('http://raspberrypi.local:8080/ask', { question });
        setResponse(res.data.response);
    };

    const runScript = async () => {
        const res = await axios.post('http://raspberrypi.local:8080/execute-script', {
        script: response,
        });
        setOutput(res.data.stdout || res.data.error);
    };

    return (
        <div className="aiassist">
            <div className='queryarea'>
                <h3>Pi Assistant</h3>
                <textarea
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask something like: 'Generate a script to check CPU temperature'"
                />
                <button className="btn" onClick={askAI}> Ask </button>
            </div>

            {!response && (
                <div className='emptyresponse'>
                    <pre>
                        Query using the above assistant.
                    </pre>
                </div>
            )}

            {response && (
                <div className="response">
                    <h4 className="">AI Response:</h4>
                    <p className="">{response}</p>

                    <button className="btn" onClick={runScript}>
                        Run Script
                    </button>
                </div>
            )}

            {output && (
                <div className="output">
                    <h2 className="">Execution Output:</h2>
                    <p className="">{output}</p>
                </div>
            )}
        </div>
  )
}

export default AI

