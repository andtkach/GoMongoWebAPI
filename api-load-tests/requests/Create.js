import "../libs/shim/expect.js";
import "../libs/shim/urijs.js";

postman[Symbol.for("define")]({
  name: "Create",
  id: "38d8a704-c73a-4145-8ada-d7b333d6c74c",
  method: "POST",
  address: "{{url}}/auth/sign-up",
  data:
    '{\r\n    "username": "{{$randomUserName}}",\r\n    "password": "{{$randomPassword}}"\r\n}',
  post(response) {
    pm.test("Get user data", function() {
      const body = JSON.parse(pm.request.body.raw);      
      pm.collectionVariables.set("username", body.username);
      pm.collectionVariables.set("password", body.password);
    });

    pm.test("Response time is less than 100ms", function() {
      pm.expect(pm.response.responseTime).to.be.below(100);
    });
    pm.test("Status code is 200", function() {
      pm.response.to.have.status(200);
    });
    pm.test("Get user id value", function() {
      var jsonData = pm.response.json();
      pm.expect(jsonData.id).to.be.a("string");
      pm.expect(jsonData.username).to.be.a("string");
      pm.collectionVariables.set("userid", jsonData.id);
    });
  }
});
