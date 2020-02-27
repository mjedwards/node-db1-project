const server = require("./server.js");
const accountRouter = require("./accounts/accountsRouter");

const PORT = process.env.PORT || 4000;

server.use("/accounts", accountRouter);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
