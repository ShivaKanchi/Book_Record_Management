const express = require('express');
const app = express();
const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: 'server is up'
    });
});
app.get("*", (req, res) => {
    res.status(404).json({
        message: 'This method is not implemented'
    });
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });

});

//http://localhost:8081