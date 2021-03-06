"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _detectPort = _interopRequireDefault(require("detect-port"));

var _chalk = _interopRequireDefault(require("chalk"));

var _auth = _interopRequireDefault(require("./api/auth.js"));

var _posts = _interopRequireDefault(require("./api/posts.js"));

var _apiDoc = _interopRequireDefault(require("./utils/api-doc.js"));

var _auth2 = require("./utils/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
// api
// utils
function log() {
  [...arguments].forEach(val => console.log(_chalk.default.cyan(val)));
} // mongo db


const db = _mongoose.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

_mongoose.default.connect('mongodb+srv://vuetest:vuetest@cluster0-dwaem.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

_mongoose.default.Promise = global.Promise; // server setup

let port;

async function configServer() {
  port = 3000 || (await (0, _detectPort.default)(3000));
}

configServer(); // express setup

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use((0, _morgan.default)('dev')); // log request
// express routers

app.use('/', _auth.default);
app.use('/posts', _auth2.authenticateUser, _posts.default); // api docs

app.use('/api', _apiDoc.default); // start

app.listen(port, () => console.log(`TIL Server listening on port ${port}!`));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsibG9nIiwiYXJndW1lbnRzIiwiZm9yRWFjaCIsInZhbCIsImNvbnNvbGUiLCJjaGFsayIsImN5YW4iLCJkYiIsIm1vbmdvb3NlIiwiY29ubmVjdGlvbiIsIm9uIiwiZXJyb3IiLCJiaW5kIiwiY29ubmVjdCIsInVzZU5ld1VybFBhcnNlciIsIlByb21pc2UiLCJnbG9iYWwiLCJwb3J0IiwiY29uZmlnU2VydmVyIiwiYXBwIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJhdXRoIiwiYXV0aGVudGljYXRlVXNlciIsInBvc3RzIiwiZG9jcyIsImxpc3RlbiJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFHQTs7OztBQWZBO0FBU0E7QUFLQTtBQUVBLFNBQVNBLEdBQVQsR0FBZTtBQUNiLEdBQUMsR0FBR0MsU0FBSixFQUFlQyxPQUFmLENBQXVCQyxHQUFHLElBQUlDLE9BQU8sQ0FBQ0osR0FBUixDQUFZSyxlQUFNQyxJQUFOLENBQVdILEdBQVgsQ0FBWixDQUE5QjtBQUNELEMsQ0FFRDs7O0FBQ0EsTUFBTUksRUFBRSxHQUFHQyxrQkFBU0MsVUFBcEI7QUFDQUYsRUFBRSxDQUFDRyxFQUFILENBQU0sT0FBTixFQUFlTixPQUFPLENBQUNPLEtBQVIsQ0FBY0MsSUFBZCxDQUFtQlIsT0FBbkIsRUFBNEIsMkJBQTVCLENBQWY7O0FBQ0FJLGtCQUFTSyxPQUFULENBQWlCLDJGQUFqQixFQUE4RztBQUFFQyxFQUFBQSxlQUFlLEVBQUU7QUFBbkIsQ0FBOUc7O0FBQ0FOLGtCQUFTTyxPQUFULEdBQW1CQyxNQUFNLENBQUNELE9BQTFCLEMsQ0FFQTs7QUFDQSxJQUFJRSxJQUFKOztBQUNBLGVBQWVDLFlBQWYsR0FBOEI7QUFDNUJELEVBQUFBLElBQUksR0FBRyxTQUFRLE1BQU0seUJBQVcsSUFBWCxDQUFkLENBQVA7QUFDRDs7QUFDREMsWUFBWSxHLENBRVo7O0FBQ0EsTUFBTUMsR0FBRyxHQUFHLHVCQUFaO0FBQ0FBLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLG9CQUFSO0FBQ0FELEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxvQkFBV0MsVUFBWCxDQUFzQjtBQUFFQyxFQUFBQSxRQUFRLEVBQUU7QUFBWixDQUF0QixDQUFSO0FBQ0FKLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxvQkFBV0csSUFBWCxFQUFSO0FBQ0FMLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLHFCQUFPLEtBQVAsQ0FBUixFLENBQXdCO0FBRXhCOztBQUNBRCxHQUFHLENBQUNDLEdBQUosQ0FBUSxHQUFSLEVBQWFLLGFBQWI7QUFDQU4sR0FBRyxDQUFDQyxHQUFKLENBQVEsUUFBUixFQUFrQk0sdUJBQWxCLEVBQW9DQyxjQUFwQyxFLENBRUE7O0FBQ0FSLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLE1BQVIsRUFBZ0JRLGVBQWhCLEUsQ0FFQTs7QUFDQVQsR0FBRyxDQUFDVSxNQUFKLENBQVdaLElBQVgsRUFBaUIsTUFBTWIsT0FBTyxDQUFDSixHQUFSLENBQWEsZ0NBQStCaUIsSUFBSyxHQUFqRCxDQUF2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYnNcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGRldGVjdFBvcnQgZnJvbSAnZGV0ZWN0LXBvcnQnO1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcblxuLy8gYXBpXG5pbXBvcnQgYXV0aCBmcm9tICcuL2FwaS9hdXRoLmpzJztcbmltcG9ydCBwb3N0cyBmcm9tICcuL2FwaS9wb3N0cy5qcyc7XG5pbXBvcnQgZG9jcyBmcm9tICcuL3V0aWxzL2FwaS1kb2MuanMnO1xuXG4vLyB1dGlsc1xuaW1wb3J0IHsgYXV0aGVudGljYXRlVXNlciB9IGZyb20gJy4vdXRpbHMvYXV0aC5qcyc7XG5mdW5jdGlvbiBsb2coKSB7XG4gIFsuLi5hcmd1bWVudHNdLmZvckVhY2godmFsID0+IGNvbnNvbGUubG9nKGNoYWxrLmN5YW4odmFsKSkpO1xufVxuXG4vLyBtb25nbyBkYlxuY29uc3QgZGIgPSBtb25nb29zZS5jb25uZWN0aW9uO1xuZGIub24oXCJlcnJvclwiLCBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSwgXCJNb25nb0RCIGNvbm5lY3Rpb24gZXJyb3I6XCIpKTtcbm1vbmdvb3NlLmNvbm5lY3QoJ21vbmdvZGIrc3J2Oi8vdnVldGVzdDp2dWV0ZXN0QGNsdXN0ZXIwLWR3YWVtLm1vbmdvZGIubmV0L3Rlc3Q/cmV0cnlXcml0ZXM9dHJ1ZSZ3PW1ham9yaXR5JywgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSk7XG5tb25nb29zZS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5cbi8vIHNlcnZlciBzZXR1cFxubGV0IHBvcnQ7XG5hc3luYyBmdW5jdGlvbiBjb25maWdTZXJ2ZXIoKSB7XG4gIHBvcnQgPSAzMDAwIHx8IGF3YWl0IGRldGVjdFBvcnQoMzAwMCk7XG59XG5jb25maWdTZXJ2ZXIoKTtcblxuLy8gZXhwcmVzcyBzZXR1cFxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShjb3JzKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UobW9yZ2FuKCdkZXYnKSk7IC8vIGxvZyByZXF1ZXN0XG5cbi8vIGV4cHJlc3Mgcm91dGVyc1xuYXBwLnVzZSgnLycsIGF1dGgpO1xuYXBwLnVzZSgnL3Bvc3RzJywgYXV0aGVudGljYXRlVXNlciwgcG9zdHMpO1xuXG4vLyBhcGkgZG9jc1xuYXBwLnVzZSgnL2FwaScsIGRvY3MpO1xuXG4vLyBzdGFydFxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiBjb25zb2xlLmxvZyhgVElMIFNlcnZlciBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9IWApKTsiXX0=