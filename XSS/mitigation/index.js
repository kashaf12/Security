const express = require("express");

const app = express();

const PORT = 3000;
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';" +
      "script-src 'self' 'nonce-random123' 'unsafe-inline';" +
      "report-to /csp-violation-report-endpoint"
  );
  next();
});

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/csp-violation-report-endpoint", express.json(), (req, res) => {
  console.log("CSP Violation: ", req.body);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port https://localhost:${PORT}`);
});
