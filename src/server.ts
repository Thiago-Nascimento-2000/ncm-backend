import express from "express"
import routers from "./routers/index.js";
import ENV from "./env/index.js";

const app = express();

app.use(express.json());
app.use(routers);

app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
});