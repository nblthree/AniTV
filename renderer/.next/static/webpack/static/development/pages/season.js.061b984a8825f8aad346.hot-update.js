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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "../node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-jsx/style */ "../node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_MyLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../components/MyLayout */ "./components/MyLayout.js");
/* harmony import */ var _components_Cadre__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../components/Cadre */ "./components/Cadre.js");













var _default =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(_default, _Component);

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
      animesTV: []
    };
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
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_MyLayout__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        id: "grid",
        className: "jsx-4035126122"
      }, this.state.animesTV.map(function (val, index) {
        return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_Cadre__WEBPACK_IMPORTED_MODULE_10__["default"], {
          anime: val,
          key: val.mal_id
        });
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_7___default.a, {
        id: "4035126122"
      }, "#grid.jsx-4035126122{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-around;-webkit-justify-content:space-around;-ms-flex-pack:space-around;justify-content:space-around;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcMDEwXFxUcnVlIFByb2plY3RcXGNsZWFuXFxyZW5kZXJlclxccGFnZXNcXHNlYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1Q3NCLEFBRzJCLDBFQUNFLHlEQUVqQiwySEFBQyIsImZpbGUiOiJDOlxcVXNlcnNcXDAxMFxcVHJ1ZSBQcm9qZWN0XFxjbGVhblxccmVuZGVyZXJcXHBhZ2VzXFxzZWFzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IExheW91dCBmcm9tICcuLy4uL2NvbXBvbmVudHMvTXlMYXlvdXQnXHJcbmltcG9ydCBDYWRyZSBmcm9tICcuLy4uL2NvbXBvbmVudHMvQ2FkcmUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgLypzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKCl7XHJcbiAgXHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5qaWthbi5tb2UvdjMvc2Vhc29uLyR7KG5ldyBEYXRlKCkpLmdldFllYXIoKSArIDE5MDB9LyR7Z2V0U2Vhc29uKCl9YClcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuXHJcbiAgICBjb25zdCBhbmltZXNUViA9IGRhdGEuYW5pbWUuZmlsdGVyKHZhbCA9PiB2YWwudHlwZSA9PT0gJ1RWJylcclxuICAgIGNvbnNvbGUubG9nKGFuaW1lc1RWKVxyXG4gICAgcmV0dXJuIHsgYW5pbWVzVFYgfVxyXG4gIH0qL1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgIFx0YW5pbWVzVFY6IFtdXHJcbiAgICB9OyBcclxuICB9XHJcbiAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5qaWthbi5tb2UvdjMvc2Vhc29uLyR7KG5ldyBEYXRlKCkpLmdldFllYXIoKSArIDE5MDB9LyR7Z2V0U2Vhc29uKCl9YClcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuXHJcbiAgICBjb25zdCBhbmltZXNUViA9IGRhdGEuYW5pbWUuZmlsdGVyKHZhbCA9PiB2YWwudHlwZSA9PT0gJ1RWJylcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBhbmltZXNUViB9KVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPExheW91dD5cclxuICAgICAgICA8ZGl2IGlkPVwiZ3JpZFwiPlxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgXHR0aGlzLnN0YXRlLmFuaW1lc1RWLm1hcCgodmFsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgXHRcdHJldHVybiAoXHJcbiAgICAgICAgICBcdFx0XHQ8Q2FkcmUgYW5pbWU9e3ZhbH0ga2V5PXt2YWwubWFsX2lkfSAvPlxyXG4gICAgICAgICAgXHRcdClcclxuICAgICAgICAgIFx0fSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDxzdHlsZSBqc3g+e2BcclxuICAgICAgICAgICAgI2dyaWQge1xyXG4gICAgICAgICAgICBcdGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIFx0ZmxleC13cmFwOiB3cmFwO1xyXG4gICAgICAgICAgICBcdGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGB9PC9zdHlsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9MYXlvdXQ+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWFzb24oKSB7XHJcbiAgICBjb25zdCBtb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDFcclxuICAgIGxldCBzZWFzb24gPSAnJztcclxuICAgIHN3aXRjaChtb250aCkge1xyXG4gICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgc2Vhc29uID0gJ3dpbnRlcic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIHNlYXNvbiA9ICdzcHJpbmcnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjpcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICBzZWFzb24gPSAnc3VtbWVyJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgY2FzZSAxMDogXHJcbiAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgc2Vhc29uID0gJ2ZhbGwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlYXNvblxyXG59Il19 */\n/*@ sourceURL=C:\\Users\\010\\True Project\\clean\\renderer\\pages\\season.js */")));
    }
  }]);

  return _default;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);



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
//# sourceMappingURL=season.js.061b984a8825f8aad346.hot-update.js.map