const dotenv = require("dotenv");
const result = dotenv.config();
const { parsed: envs } = result;
module.exports = envs;
// admin:modelcraft21@ds339458.mlab.com:39458/modelcraft-management-db
