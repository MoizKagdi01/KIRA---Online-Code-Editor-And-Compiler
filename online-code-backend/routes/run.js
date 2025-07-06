const express = require('express')
const router = express.Router()
const path = require('path');
const getLanguageId = (language) => {
    // const languages = {
    //     javascript: 63,
    //     python: 71,
    //     java: 62,
    //     cpp: 54,
    //     c: 50,
    //     csharp: 51,
    //     ruby: 72,
    //     go: 60
    // };
    const languages = {
  assembly: 45,
  bash: 46,
  basic: 47,
  c: 50,
  cpp: 54,
  csharp: 51,
  common_lisp: 55,
  d: 56,
  elixir: 57,
  erlang: 58,
  executable: 44,
  fortran: 59,
  go: 60,
  haskell: 61,
  java: 62,
  nodejs: 63,
  lua: 64,
  ocaml: 65,
  octave: 66,
  pascal: 67,
  php: 68,
  plain_text: 43,
  prolog: 69,
  python2: 70,
  python: 71,
  ruby: 72,
  rust: 73,
  typescript: 74
};
    return (languages[language] || null)
};
router.post('/run', async (req, res) => {
        const usersFolder = path.join('./users');
        const userProject = path.join(usersFolder, req.body.email);
        const projectName = path.join(userProject, req.body.prname);
        const file=req.body.file
        const fullPath = path.join(projectName,file)
        const input = req.body.input
    const { code, language } = req.body;
    if (!code || !language) {
        return res.status(200).json({ error: 'Code and language are required.' });
    }
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
    if (language == "html" || language == "css" || language == "javascript") {
        res.send({"stdout":`<a style="color:#008;text-decoration:underline" href="http://localhost:5000/sendhtml?fileaddr=${fullPath}" target="_blank"> Project will be live at this link </a>`})
    } else {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-key': 'dc7e0166dcmsh67e52a1629c71e9p110fbajsn0e3cfacc6796',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            },
            body: JSON.stringify({
                source_code: code,
                language_id: getLanguageId(language),
                stdin:input,
                base64_encoded:true
            })
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            res.json(result);
        } catch (error) {
            console.error('Error:', error);
            res.status(200).json({ compile_output: error });
        }
    }
});
module.exports=router;