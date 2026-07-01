const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

console.log("Step 1");

dotenv.config();

console.log("Step 2");

connectDB();

console.log("Step 3");

const PORT = process.env.PORT || 5000;

console.log("PORT =", PORT);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

console.log("Step 4");