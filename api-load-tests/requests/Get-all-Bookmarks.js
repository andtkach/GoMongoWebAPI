import "../libs/shim/expect.js";
import "../libs/shim/urijs.js";

postman[Symbol.for("define")]({
  name: "Get all Bookmarks",
  id: "b0297003-0d7a-43f0-b527-dc1e20e2cba9",
  method: "GET",
  address: "{{url}}/api/bookmarks",
  post(response) {
    pm.test("Status code is 200", function() {
      pm.response.to.have.status(200);
    });
    pm.test("Response time is less than 200ms", function() {
      pm.expect(pm.response.responseTime).to.be.below(200);
    });
    pm.test("Body has bookmarks", function() {
      pm.expect(pm.response.text()).to.include("bookmarks");
    });
    pm.test("Get bookmarks value", function() {
      var jsonData = pm.response.json();
      pm.expect(jsonData.bookmarks).to.be.a("array");
    });
  },
  auth(config, Var) {
    config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
  }
});
