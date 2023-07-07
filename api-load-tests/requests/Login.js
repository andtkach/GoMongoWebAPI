import "../libs/shim/expect.js";
import "../libs/shim/urijs.js";

postman[Symbol.for("define")]({
  name: "Login",
  id: "dd47229e-1994-4998-aee1-d9632f70603a",
  method: "POST",
  address: "{{url}}/auth/sign-in",
  data:
    '{\r\n\t"username": "{{username}}",\r\n\t"password": "{{password}}"\r\n}',
  post(response) {
    pm.test("Status code is 200", function() {
      pm.response.to.have.status(200);
    });
    pm.test("Response time is less than 100ms", function() {
      pm.expect(pm.response.responseTime).to.be.below(100);
    });
    pm.test("Body has token", function() {
      pm.expect(pm.response.text()).to.include("token");
    });
    pm.test("Get token value", function() {
      var jsonData = pm.response.json();
      pm.expect(jsonData.token).to.be.a("string");
      pm.collectionVariables.set("token", jsonData.token);
    });
  }
});
