import app from "./app";

const port: number = 3000;

app.listen(port, () => {
  console.log("😤 Server ready!");
  console.log("⚡ REST API listening on: localhost:%d", port);
  console.log("🚀 GRAPHQL listening on: localhost:%d%s", port, "/graphql");
});
