import "../libs/shim/expect.js";
import "../libs/shim/urijs.js";

postman[Symbol.for("define")]({
  name: "Delete Bookmark",
  id: "4194705c-4b64-4569-a759-13e40d5b3ee9",
  method: "DELETE",
  address: "{{url}}/api/bookmarks",
  data: '{\r\n\t"id": "{{bookmark}}"\r\n} ',
  post(response) {
    pm.test("Response time is less than 100ms", function() {
      pm.expect(pm.response.responseTime).to.be.below(100);
    });
    pm.test("Status code is 200", function() {
      pm.response.to.have.status(200);
    });
  },
  auth(config, Var) {
    config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
  }
});
