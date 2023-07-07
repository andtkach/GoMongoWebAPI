import "../libs/shim/expect.js";
import "../libs/shim/urijs.js";

postman[Symbol.for("define")]({
  name: "Update Bookmark",
  id: "a369e79d-c9ff-4e1f-9320-142cad15da19",
  method: "PUT",
  address: "{{url}}/api/bookmarks",
  data:
    '{\r\n    "id": "{{bookmark}}",\r\n\t"url": "{{$randomUrl}}",\r\n\t"title": "{{$randomLoremText}}"\r\n}',
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
