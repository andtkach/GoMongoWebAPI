import "../libs/shim/expect.js";
import "../libs/shim/urijs.js";

postman[Symbol.for("define")]({
  name: "Create Bookmark",
  id: "ccef9dbf-f1e5-4b18-8a03-545381b18f6c",
  method: "POST",
  address: "{{url}}/api/bookmarks",
  data:
    '{\r\n\t"url": "{{$randomUrl}}",\r\n\t"title": "{{$randomLoremText}}"\r\n}',
  post(response) {
    pm.test("Response time is less than 100ms", function() {
      pm.expect(pm.response.responseTime).to.be.below(100);
    });
    pm.test("Status code is 200", function() {
      pm.response.to.have.status(200);
    });
    pm.test("Get bookmark id value", function() {
      var jsonData = pm.response.json();
      pm.expect(jsonData.id).to.be.a("string");
      pm.collectionVariables.set("bookmark", jsonData.id);
    });
  },
  auth(config, Var) {
    config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
  }
});
