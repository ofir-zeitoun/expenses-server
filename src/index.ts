import app from "./app";  // separate the app for testing
import { connect } from "./db";
const port = process.env.PORT || 1337;

app.listen(port, async (): Promise<void> => {
  await connect();
  console.log(`Server Running here 👉 https://localhost:${port}`);
});
