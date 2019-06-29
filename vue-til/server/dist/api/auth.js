"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _express = require("express");

var _auth = require("../utils/auth.js");

var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
// modules
// router init
const router = (0, _express.Router)(); // router

router.post('/login', (req, res) => {
  // find the user
  _UserModel.default.findOne({
    username: req.body.username
  }).then(user => {
    // non registered user
    if (!user) {
      res.status(401).send('Authentication failed. User not found.');
    }

    _bcrypt.default.compare(req.body.password, user.password, (error, result) => {
      if (error) {
        res.status(500).send('Internal Server Error');
      }

      if (result) {
        // create token with user info
        const token = (0, _auth.newToken)(user); // current logged-in user

        const loggedInUser = {
          username: user.username,
          nickname: user.nickname
        }; // return the information including token as JSON

        res.status(200).json({
          success: true,
          user: loggedInUser,
          message: 'Login Success',
          token: token
        });
      } else {
        res.status(401).json('Authentication failed. Wrong password.');
      }
    });
  }).catch(error => {
    res.status(500).json('Internal Server Error');
    throw error;
  });
});
router.post('/signup', (req, res) => {
  const {
    username,
    password,
    nickname
  } = req.body; // encrypt password
  // NOTE: 10 is saltround which is a cost factor

  _bcrypt.default.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error
      });
    } else {
      const newUser = new _UserModel.default({
        username,
        password: hashedPassword,
        nickname
      });
      newUser.save((error, saved) => {
        if (error) {
          console.log(error);
          res.status(409).send(error);
        } else {
          console.log(saved);
          res.send(saved);
        }
      });
    }
  });
}); // TODO: Logout 구현 필요

var _default = router;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvYXV0aC5qcyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwb3N0IiwicmVxIiwicmVzIiwiVXNlck1vZGVsIiwiZmluZE9uZSIsInVzZXJuYW1lIiwiYm9keSIsInRoZW4iLCJ1c2VyIiwic3RhdHVzIiwic2VuZCIsImJjcnlwdCIsImNvbXBhcmUiLCJwYXNzd29yZCIsImVycm9yIiwicmVzdWx0IiwidG9rZW4iLCJsb2dnZWRJblVzZXIiLCJuaWNrbmFtZSIsImpzb24iLCJzdWNjZXNzIiwibWVzc2FnZSIsImNhdGNoIiwiaGFzaCIsImhhc2hlZFBhc3N3b3JkIiwiY29uc29sZSIsImxvZyIsIm5ld1VzZXIiLCJzYXZlIiwic2F2ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7OztBQU5BO0FBSUE7QUFJQTtBQUNBLE1BQU1BLE1BQU0sR0FBRyxzQkFBZixDLENBRUE7O0FBQ0FBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFFBQVosRUFBc0IsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFDbEM7QUFDQUMscUJBQVVDLE9BQVYsQ0FBa0I7QUFDaEJDLElBQUFBLFFBQVEsRUFBRUosR0FBRyxDQUFDSyxJQUFKLENBQVNEO0FBREgsR0FBbEIsRUFHQ0UsSUFIRCxDQUdNQyxJQUFJLElBQUk7QUFDWjtBQUNBLFFBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1ROLE1BQUFBLEdBQUcsQ0FBQ08sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCLHdDQUFyQjtBQUNEOztBQUNEQyxvQkFBT0MsT0FBUCxDQUFlWCxHQUFHLENBQUNLLElBQUosQ0FBU08sUUFBeEIsRUFBa0NMLElBQUksQ0FBQ0ssUUFBdkMsRUFBaUQsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLEtBQW1CO0FBQ2xFLFVBQUlELEtBQUosRUFBVztBQUNUWixRQUFBQSxHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQix1QkFBckI7QUFDRDs7QUFDRCxVQUFJSyxNQUFKLEVBQVk7QUFDVjtBQUNBLGNBQU1DLEtBQUssR0FBRyxvQkFBU1IsSUFBVCxDQUFkLENBRlUsQ0FJVjs7QUFDQSxjQUFNUyxZQUFZLEdBQUc7QUFDbkJaLFVBQUFBLFFBQVEsRUFBRUcsSUFBSSxDQUFDSCxRQURJO0FBRW5CYSxVQUFBQSxRQUFRLEVBQUVWLElBQUksQ0FBQ1U7QUFGSSxTQUFyQixDQUxVLENBVVY7O0FBQ0FoQixRQUFBQSxHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCVSxJQUFoQixDQUFxQjtBQUNuQkMsVUFBQUEsT0FBTyxFQUFFLElBRFU7QUFFbkJaLFVBQUFBLElBQUksRUFBRVMsWUFGYTtBQUduQkksVUFBQUEsT0FBTyxFQUFFLGVBSFU7QUFJbkJMLFVBQUFBLEtBQUssRUFBRUE7QUFKWSxTQUFyQjtBQU1ELE9BakJELE1BaUJPO0FBQ0xkLFFBQUFBLEdBQUcsQ0FBQ08sTUFBSixDQUFXLEdBQVgsRUFBZ0JVLElBQWhCLENBQXFCLHdDQUFyQjtBQUNEO0FBQ0YsS0F4QkQ7QUF5QkQsR0FqQ0QsRUFrQ0NHLEtBbENELENBa0NPUixLQUFLLElBQUk7QUFDZFosSUFBQUEsR0FBRyxDQUFDTyxNQUFKLENBQVcsR0FBWCxFQUFnQlUsSUFBaEIsQ0FBcUIsdUJBQXJCO0FBQ0EsVUFBTUwsS0FBTjtBQUNELEdBckNEO0FBc0NELENBeENEO0FBMENBZixNQUFNLENBQUNDLElBQVAsQ0FBWSxTQUFaLEVBQXVCLENBQUNDLEdBQUQsRUFBTUMsR0FBTixLQUFjO0FBQ25DLFFBQU07QUFDSkcsSUFBQUEsUUFESTtBQUVKUSxJQUFBQSxRQUZJO0FBR0pLLElBQUFBO0FBSEksTUFJRmpCLEdBQUcsQ0FBQ0ssSUFKUixDQURtQyxDQU1uQztBQUNBOztBQUNBSyxrQkFBT1ksSUFBUCxDQUFZVixRQUFaLEVBQXNCLEVBQXRCLEVBQTBCLENBQUNDLEtBQUQsRUFBUVUsY0FBUixLQUEyQjtBQUNuRCxRQUFJVixLQUFKLEVBQVc7QUFDVFcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlaLEtBQVo7QUFDQSxhQUFPWixHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCVSxJQUFoQixDQUFxQjtBQUMxQkwsUUFBQUE7QUFEMEIsT0FBckIsQ0FBUDtBQUdELEtBTEQsTUFLTztBQUNMLFlBQU1hLE9BQU8sR0FBRyxJQUFJeEIsa0JBQUosQ0FBYztBQUM1QkUsUUFBQUEsUUFENEI7QUFFNUJRLFFBQUFBLFFBQVEsRUFBRVcsY0FGa0I7QUFHNUJOLFFBQUFBO0FBSDRCLE9BQWQsQ0FBaEI7QUFLQVMsTUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBQ2QsS0FBRCxFQUFRZSxLQUFSLEtBQWtCO0FBQzdCLFlBQUlmLEtBQUosRUFBVztBQUNUVyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVosS0FBWjtBQUNBWixVQUFBQSxHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQkksS0FBckI7QUFDRCxTQUhELE1BR087QUFDTFcsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlHLEtBQVo7QUFDQTNCLFVBQUFBLEdBQUcsQ0FBQ1EsSUFBSixDQUFTbUIsS0FBVDtBQUNEO0FBQ0YsT0FSRDtBQVNEO0FBQ0YsR0F0QkQ7QUF1QkQsQ0EvQkQsRSxDQWlDQTs7ZUFFZTlCLE0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsaWJzXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcblxuLy8gbW9kdWxlc1xuaW1wb3J0IHsgbmV3VG9rZW4gfSBmcm9tICcuLi91dGlscy9hdXRoLmpzJztcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbC5qcyc7XG5cbi8vIHJvdXRlciBpbml0XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuLy8gcm91dGVyXG5yb3V0ZXIucG9zdCgnL2xvZ2luJywgKHJlcSwgcmVzKSA9PiB7XG4gIC8vIGZpbmQgdGhlIHVzZXJcbiAgVXNlck1vZGVsLmZpbmRPbmUoe1xuICAgIHVzZXJuYW1lOiByZXEuYm9keS51c2VybmFtZSxcbiAgfSlcbiAgLnRoZW4odXNlciA9PiB7XG4gICAgLy8gbm9uIHJlZ2lzdGVyZWQgdXNlclxuICAgIGlmICghdXNlcikge1xuICAgICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZC4gVXNlciBub3QgZm91bmQuJyk7XG4gICAgfVxuICAgIGJjcnlwdC5jb21wYXJlKHJlcS5ib2R5LnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkLCAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5zZW5kKCdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgLy8gY3JlYXRlIHRva2VuIHdpdGggdXNlciBpbmZvXG4gICAgICAgIGNvbnN0IHRva2VuID0gbmV3VG9rZW4odXNlcik7XG4gICAgICAgIFxuICAgICAgICAvLyBjdXJyZW50IGxvZ2dlZC1pbiB1c2VyXG4gICAgICAgIGNvbnN0IGxvZ2dlZEluVXNlciA9IHtcbiAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICBuaWNrbmFtZTogdXNlci5uaWNrbmFtZSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGluZm9ybWF0aW9uIGluY2x1ZGluZyB0b2tlbiBhcyBKU09OXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIHVzZXI6IGxvZ2dlZEluVXNlcixcbiAgICAgICAgICBtZXNzYWdlOiAnTG9naW4gU3VjY2VzcycsXG4gICAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQuIFdyb25nIHBhc3N3b3JkLicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KVxuICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKCdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfSk7XG59KTtcblxucm91dGVyLnBvc3QoJy9zaWdudXAnLCAocmVxLCByZXMpID0+IHtcbiAgY29uc3Qge1xuICAgIHVzZXJuYW1lLFxuICAgIHBhc3N3b3JkLFxuICAgIG5pY2tuYW1lXG4gIH0gPSByZXEuYm9keTtcbiAgLy8gZW5jcnlwdCBwYXNzd29yZFxuICAvLyBOT1RFOiAxMCBpcyBzYWx0cm91bmQgd2hpY2ggaXMgYSBjb3N0IGZhY3RvclxuICBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTAsIChlcnJvciwgaGFzaGVkUGFzc3dvcmQpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgIGVycm9yXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3VXNlciA9IG5ldyBVc2VyTW9kZWwoe1xuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkLFxuICAgICAgICBuaWNrbmFtZVxuICAgICAgfSk7XG4gICAgICBuZXdVc2VyLnNhdmUoKGVycm9yLCBzYXZlZCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgcmVzLnN0YXR1cyg0MDkpLnNlbmQoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHNhdmVkKTtcbiAgICAgICAgICByZXMuc2VuZChzYXZlZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59KTtcblxuLy8gVE9ETzogTG9nb3V0IOq1rO2YhCDtlYTsmpRcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyJdfQ==