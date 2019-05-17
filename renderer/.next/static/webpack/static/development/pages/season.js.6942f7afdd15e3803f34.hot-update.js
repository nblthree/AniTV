webpackHotUpdate("static\\development\\pages\\season.js",{

/***/ "./pages/season.js":
/*!*************************!*\
  !*** ./pages/season.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "../node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "../node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "../node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "../node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "../node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "../node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "../node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "../node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! styled-jsx/style */ "../node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_MyLayout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../components/MyLayout */ "./components/MyLayout.js");
/* harmony import */ var _components_Cadre__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../components/Cadre */ "./components/Cadre.js");














var _default =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(_default, _Component);

  /*static async getInitialProps(){
  	const response = await fetch(`https://api.jikan.moe/v3/season/${(new Date()).getYear() + 1900}/${getSeason()}`)
    const data = await response.json()
      const animesTV = data.anime.filter(val => val.type === 'TV')
    console.log(animesTV)
    return { animesTV }
  }*/
  function _default(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _default);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(_default).call(this, props));
    _this.state = {
      animesTV: [],
      info: false
    };
    _this.handleInfo = _this.handleInfo.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(_default, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response, data, animesTV;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("https://api.jikan.moe/v3/season/".concat(new Date().getYear() + 1900, "/").concat(getSeason()));

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                data = _context.sent;
                animesTV = data.anime.filter(function (val) {
                  return val.type === 'TV';
                });
                this.setState({
                  animesTV: animesTV
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "handleInfo",
    value: function handleInfo(info) {
      this.setState({
        info: info
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_MyLayout__WEBPACK_IMPORTED_MODULE_10__["default"], null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        id: "grid",
        className: "jsx-3221117413"
      }, this.state.info ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        id: "info",
        className: "jsx-3221117413"
      }) : null, this.state.animesTV.map(function (val, index) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Cadre__WEBPACK_IMPORTED_MODULE_11__["default"], {
          info: _this2.handleInfo,
          anime: val,
          key: val.mal_id
        });
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default.a, {
        id: "3221117413"
      }, "#grid.jsx-3221117413{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-around;-webkit-justify-content:space-around;-ms-flex-pack:space-around;justify-content:space-around;position:relative;}#info.jsx-3221117413{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#ffffff1f;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcMDEwXFxUcnVlIFByb2plY3RcXGNsZWFuXFxyZW5kZXJlclxccGFnZXNcXHNlYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRHNCLEFBRzJCLEFBTUssa0JBQ1osTUFDQyxPQUNJLFdBQ0MsWUFDZSxvQkFWWixPQVdoQixrREFWOEIsMkhBQ1gsa0JBQ25CIiwiZmlsZSI6IkM6XFxVc2Vyc1xcMDEwXFxUcnVlIFByb2plY3RcXGNsZWFuXFxyZW5kZXJlclxccGFnZXNcXHNlYXNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4vLi4vY29tcG9uZW50cy9NeUxheW91dCdcclxuaW1wb3J0IENhZHJlIGZyb20gJy4vLi4vY29tcG9uZW50cy9DYWRyZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAvKnN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoKXtcclxuICBcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmppa2FuLm1vZS92My9zZWFzb24vJHsobmV3IERhdGUoKSkuZ2V0WWVhcigpICsgMTkwMH0vJHtnZXRTZWFzb24oKX1gKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG5cclxuICAgIGNvbnN0IGFuaW1lc1RWID0gZGF0YS5hbmltZS5maWx0ZXIodmFsID0+IHZhbC50eXBlID09PSAnVFYnKVxyXG4gICAgY29uc29sZS5sb2coYW5pbWVzVFYpXHJcbiAgICByZXR1cm4geyBhbmltZXNUViB9XHJcbiAgfSovXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgXHRhbmltZXNUVjogW10sXHJcbiAgICBcdGluZm86IGZhbHNlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5oYW5kbGVJbmZvID0gdGhpcy5oYW5kbGVJbmZvLmJpbmQodGhpcylcclxuICB9XHJcbiAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5qaWthbi5tb2UvdjMvc2Vhc29uLyR7KG5ldyBEYXRlKCkpLmdldFllYXIoKSArIDE5MDB9LyR7Z2V0U2Vhc29uKCl9YClcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuXHJcbiAgICBjb25zdCBhbmltZXNUViA9IGRhdGEuYW5pbWUuZmlsdGVyKHZhbCA9PiB2YWwudHlwZSA9PT0gJ1RWJylcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBhbmltZXNUViB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlSW5mbyhpbmZvKXtcclxuICBcdHRoaXMuc2V0U3RhdGUoeyBpbmZvIH0pXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TGF5b3V0PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJncmlkXCI+XHJcbiAgICAgICAgICB7IHRoaXMuc3RhdGUuaW5mbyA/IFxyXG4gICAgICAgICAgXHQ8ZGl2IGlkPVwiaW5mb1wiPlxyXG5cclxuICAgICAgICAgIFx0PC9kaXY+IDpcclxuICAgICAgICAgIFx0bnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgXHR0aGlzLnN0YXRlLmFuaW1lc1RWLm1hcCgodmFsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgXHRcdHJldHVybiAoXHJcbiAgICAgICAgICBcdFx0XHQ8Q2FkcmUgaW5mbz17dGhpcy5oYW5kbGVJbmZvfSBhbmltZT17dmFsfSBrZXk9e3ZhbC5tYWxfaWR9IC8+XHJcbiAgICAgICAgICBcdFx0KVxyXG4gICAgICAgICAgXHR9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgPHN0eWxlIGpzeD57YFxyXG4gICAgICAgICAgICAjZ3JpZCB7XHJcbiAgICAgICAgICAgIFx0ZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgXHRmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgICAgIFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICAgICAgICAgIFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICNpbmZvIHtcclxuICAgICAgICAgICAgXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIFx0dG9wOiAwO1xyXG4gICAgICAgICAgICBcdGxlZnQ6IDA7XHJcbiAgICAgICAgICAgIFx0d2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIFx0aGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBcdGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmYxZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgYH08L3N0eWxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0xheW91dD5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlYXNvbigpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMVxyXG4gICAgbGV0IHNlYXNvbiA9ICcnO1xyXG4gICAgc3dpdGNoKG1vbnRoKSB7XHJcbiAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICBzZWFzb24gPSAnd2ludGVyJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgc2Vhc29uID0gJ3NwcmluZyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgIGNhc2UgNzpcclxuICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgIHNlYXNvbiA9ICdzdW1tZXInO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTpcclxuICAgICAgICBjYXNlIDEwOiBcclxuICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICBzZWFzb24gPSAnZmFsbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2Vhc29uXHJcbn0iXX0= */\n/*@ sourceURL=C:\\Users\\010\\True Project\\clean\\renderer\\pages\\season.js */")));
    }
  }]);

  return _default;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);



function getSeason() {
  var month = new Date().getMonth() + 1;
  var season = '';

  switch (month) {
    case 12:
    case 1:
    case 2:
      season = 'winter';
      break;

    case 3:
    case 4:
    case 5:
      season = 'spring';
      break;

    case 6:
    case 7:
    case 8:
      season = 'summer';
      break;

    case 9:
    case 10:
    case 11:
      season = 'fall';
      break;
  }

  return season;
}

/***/ })

})
//# sourceMappingURL=season.js.6942f7afdd15e3803f34.hot-update.js.map