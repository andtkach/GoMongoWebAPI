import "../libs/shim/urijs.js";

postman[Symbol.for("define")]({
  name: "Get Bookmark",
  id: "5de6a5a1-814e-4639-b007-b7df7d8b555b",
  method: "GET",
  address: "{{url}}/api/bookmarks/{{bookmark}}",
  auth(config, Var) {
    config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
  }
});
