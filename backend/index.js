import express, { json } from "express";
import bodyParser from "body-parser";
import os, { freemem, totalmem } from "os-utils";
import { exec } from "child_process";
import { time } from "console";
import fs from "fs";
import env from "dotenv";
import {GoogleGenerativeAI} from "@google/generative-ai";

const app = express();
const port = 8080;
env.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

// CORS Chrome
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/cpu", (req, res)=>{
    os.cpuUsage((p)=>{
        res.json(+(p*100).toFixed(2));
    });
});

app.get("/mem", (req, res)=>{
    res.json({
        freemem : (os.freemem()).toFixed(0),
        totalmem: (os.totalmem()).toFixed(0)
    });
});

app.get("/temp", (req, res)=>{
    exec('echo "$(($(cat /sys/class/thermal/thermal_zone0/temp)/1000))"', (err, temp, stderr)=>{
        res.json(temp.trim());
    });
})

app.get("/info", (req, res)=>{
    const date = new Date();
    var model = "Unknown";
    exec('uname -m', (err, mod, stderr)=> {
        model = mod.trim();
    })
    const info = {
        platform: os.platform(),
        cpuno: os.cpuCount(),
        uptime: os.sysUptime(),
        iso: date.toISOString(),
        locale: date.toLocaleString(),
        timestamp: date.getTime(),
        model: model
    }
    res.json(info);
})

app.get("/process", (req, res)=>{
    const cmd = 'ps aux --sort=-%cpu | head -n 6';
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
        console.error('Error executing ps:', err);
        return res.status(500).json({ error: 'Failed to fetch processes' });
        }
        const lines = stdout.trim().split('\n');
        const header = lines.shift().trim().split(/\s+/);
        const processes = lines.map(line => {
        const cols = line.trim().split(/\s+/, header.length);
        return header.reduce((obj, key, i) => {
            obj[key] = cols[i];
            return obj;
        }, {});
        });
        res.json(processes);
    });
})



app.post("/ask", async (req, res) => {
    const { question } = req.body; 

    if (!question) {
        return res.status(400).json({ error: "question is required" });
    }

    try {
        const result = await model.generateContent({
            contents: [
                {
                    role:"user",
                    parts: [{text: 'You are an assistant for managing a Raspberry Pi Zero 2 W server. Generate shell scripts and return "only" a single line script as response without any comments.'}]
                },
                { 
                    role: "user",
                    parts: [{ text: question }] 
                }
            ],
        });

        let response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        response = response.replace(/`/g, '').replace(/[\r\n]+/g, "").replace(/^['"]+|['"]+$/g, "");
        console.log("AI Response:", response);
        res.json({ response });

    } catch (error) {
        console.error("Error querying AI:", error);
        res.status(500).json({ error: "Error querying AI: " + error.message });
    }
});

// ... (your /execute-script route)

app.post('/execute-script', (req, res) => {
  const { script } = req.body;

  if (!script) {
    return res.status(400).json({ error: "Script is required." });
  }

  exec(script, (error, stdout, stderr) => {
    if (error) {
      console.error("Execution Error:", error); // Log the error
      return res.status(500).json({ error: error.message }); // Return 500 for execution errors
    }
    res.json({ stdout, stderr });
  });
});



app.listen(port , ()=>{
    console.log(`Running on port: ${port}`);
});