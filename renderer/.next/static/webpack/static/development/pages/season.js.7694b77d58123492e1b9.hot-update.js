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
      console.log(info);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_MyLayout__WEBPACK_IMPORTED_MODULE_10__["default"], null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        id: "grid",
        className: "jsx-240840301"
      }, this.state.info ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        id: "info",
        className: "jsx-240840301"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "jsx-240840301" + " " + "exit"
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "jsx-240840301" + " " + "title"
      }, this.state.info.title), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "jsx-240840301" + " " + "synopsis"
      }, this.state.info.synopsis)) : null, this.state.animesTV.map(function (val, index) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Cadre__WEBPACK_IMPORTED_MODULE_11__["default"], {
          info: _this2.handleInfo,
          anime: val,
          key: val.mal_id
        });
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default.a, {
        id: "240840301"
      }, "#grid.jsx-240840301{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-around;-webkit-justify-content:space-around;-ms-flex-pack:space-around;justify-content:space-around;position:relative;}#info.jsx-240840301{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;background-color:#000000de;padding:0 50px;box-sizing:border-box;}.title.jsx-240840301{text-align:center;font-weight:600;font-size:2rem;padding:50px 0;}.synopsis.jsx-240840301{font-size:1.05rem;text-indent:2rem;max-width:800px;margin:auto;}.exit.jsx-240840301{width:50px;height:50px;position:fixed;top:20px;left:20px;cursor:pointer;}.exit.jsx-240840301:before,.exit.jsx-240840301:after{content:'';width:40px;height:2px;background-color:#fff;position:absolute;top:calc(25px - 1px);left:5px;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;}.exit.jsx-240840301:before{-webkit-transform:rotateZ(45deg);-ms-transform:rotateZ(45deg);transform:rotateZ(45deg);}.exit.jsx-240840301:after{-webkit-transform:rotateZ(-45deg);-ms-transform:rotateZ(-45deg);transform:rotateZ(-45deg);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcMDEwXFxUcnVlIFByb2plY3RcXGNsZWFuXFxyZW5kZXJlclxccGFnZXNcXHNlYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzRHNCLEFBRzJCLEFBTUssQUFXQSxBQU1BLEFBTVAsQUFTQSxBQVVjLEFBR0MsV0FyQmQsQUFTRCxPQWhDTCxBQVdJLEFBTUMsSUFnQkEsQ0FUSSxDQXZCUixPQUNJLEVBZ0NXLENBdEJiLENBTUMsR0FPRCxJQXRCRyxLQXVCRixFQWJELEVBTUgsR0FmSSxDQStCUSxFQVJILE1BUGhCLENBZjRCLEFBUzVCLFFBY0EsQ0FRc0IsQ0ExQ04sYUFnRGhCLEdBR0EsQ0F2Q2dCLEdBK0JOLFNBQ2UsR0EvQlIsc0JBQ2pCLEdBYjhCLHdEQTRDOUIsbUVBM0NtQixrQkFDbkIiLCJmaWxlIjoiQzpcXFVzZXJzXFwwMTBcXFRydWUgUHJvamVjdFxcY2xlYW5cXHJlbmRlcmVyXFxwYWdlc1xcc2Vhc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi8uLi9jb21wb25lbnRzL015TGF5b3V0J1xyXG5pbXBvcnQgQ2FkcmUgZnJvbSAnLi8uLi9jb21wb25lbnRzL0NhZHJlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIC8qc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcygpe1xyXG4gIFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuamlrYW4ubW9lL3YzL3NlYXNvbi8keyhuZXcgRGF0ZSgpKS5nZXRZZWFyKCkgKyAxOTAwfS8ke2dldFNlYXNvbigpfWApXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcblxyXG4gICAgY29uc3QgYW5pbWVzVFYgPSBkYXRhLmFuaW1lLmZpbHRlcih2YWwgPT4gdmFsLnR5cGUgPT09ICdUVicpXHJcbiAgICBjb25zb2xlLmxvZyhhbmltZXNUVilcclxuICAgIHJldHVybiB7IGFuaW1lc1RWIH1cclxuICB9Ki9cclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICBcdGFuaW1lc1RWOiBbXSxcclxuICAgIFx0aW5mbzogZmFsc2VcclxuICAgIH07XHJcbiAgICB0aGlzLmhhbmRsZUluZm8gPSB0aGlzLmhhbmRsZUluZm8uYmluZCh0aGlzKVxyXG4gIH1cclxuICBhc3luYyBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmppa2FuLm1vZS92My9zZWFzb24vJHsobmV3IERhdGUoKSkuZ2V0WWVhcigpICsgMTkwMH0vJHtnZXRTZWFzb24oKX1gKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG5cclxuICAgIGNvbnN0IGFuaW1lc1RWID0gZGF0YS5hbmltZS5maWx0ZXIodmFsID0+IHZhbC50eXBlID09PSAnVFYnKVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFuaW1lc1RWIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVJbmZvKGluZm8pe1xyXG4gIFx0dGhpcy5zZXRTdGF0ZSh7IGluZm8gfSlcclxuICBcdGNvbnNvbGUubG9nKGluZm8pXHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TGF5b3V0PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJncmlkXCI+XHJcbiAgICAgICAgICB7IHRoaXMuc3RhdGUuaW5mbyA/IFxyXG4gICAgICAgICAgXHQ8ZGl2IGlkPVwiaW5mb1wiPlxyXG4gICAgICAgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZXhpdFwiPjwvZGl2PlxyXG4gICAgICAgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57dGhpcy5zdGF0ZS5pbmZvLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwic3lub3BzaXNcIj57dGhpcy5zdGF0ZS5pbmZvLnN5bm9wc2lzfTwvZGl2PlxyXG4gICAgICAgICAgXHQ8L2Rpdj4gOlxyXG4gICAgICAgICAgXHRudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICBcdHRoaXMuc3RhdGUuYW5pbWVzVFYubWFwKCh2YWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBcdFx0cmV0dXJuIChcclxuICAgICAgICAgIFx0XHRcdDxDYWRyZSBpbmZvPXt0aGlzLmhhbmRsZUluZm99IGFuaW1lPXt2YWx9IGtleT17dmFsLm1hbF9pZH0gLz5cclxuICAgICAgICAgIFx0XHQpXHJcbiAgICAgICAgICBcdH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICA8c3R5bGUganN4PntgXHJcbiAgICAgICAgICAgICNncmlkIHtcclxuICAgICAgICAgICAgXHRkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBcdGZsZXgtd3JhcDogd3JhcDtcclxuICAgICAgICAgICAgXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgICAgICAgICAgXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgI2luZm8ge1xyXG4gICAgICAgICAgICBcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgXHR0b3A6IDA7XHJcbiAgICAgICAgICAgIFx0bGVmdDogMDtcclxuICAgICAgICAgICAgXHR3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgXHRoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIFx0ei1pbmRleDogMTtcclxuICAgICAgICAgICAgXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwZGU7XHJcbiAgICAgICAgICAgIFx0cGFkZGluZzogMCA1MHB4O1xyXG4gICAgXHRcdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudGl0bGUge1xyXG4gICAgICAgICAgICBcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0ICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcblx0XHRcdCAgICBmb250LXNpemU6IDJyZW07XHJcblx0XHRcdCAgICBwYWRkaW5nOiA1MHB4IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnN5bm9wc2lzIHtcclxuICAgICAgICAgICAgXHRmb250LXNpemU6IDEuMDVyZW07XHJcblx0XHRcdCAgICB0ZXh0LWluZGVudDogMnJlbTtcclxuXHRcdFx0ICAgIG1heC13aWR0aDogODAwcHg7XHJcblx0XHRcdCAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLmV4aXQge1xyXG4gICAgICAgICAgICBcdHdpZHRoOiA1MHB4O1xyXG4gICAgICAgICAgICBcdGhlaWdodDogNTBweDtcclxuICAgICAgICAgICAgXHRwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgICAgIFx0dG9wOiAyMHB4O1xyXG4gICAgICAgICAgICBcdGxlZnQ6IDIwcHg7XHJcbiAgICAgICAgICAgIFx0Y3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5leGl0OmJlZm9yZSxcclxuICAgICAgICAgICAgLmV4aXQ6YWZ0ZXIge1xyXG4gICAgICAgICAgICBcdGNvbnRlbnQ6ICcnO1xyXG4gICAgICAgICAgICBcdHdpZHRoOiA0MHB4O1xyXG4gICAgICAgICAgICBcdGhlaWdodDogMnB4O1xyXG4gICAgICAgICAgICBcdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIFx0cG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICBcdHRvcDogY2FsYygyNXB4IC0gMXB4KTtcclxuICAgICAgICAgICAgXHRsZWZ0OiA1cHg7XHJcbiAgICAgICAgICAgIFx0dHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5leGl0OmJlZm9yZSB7XHJcbiAgICAgICAgICAgIFx0dHJhbnNmb3JtOiByb3RhdGVaKDQ1ZGVnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuZXhpdDphZnRlciB7XHJcbiAgICAgICAgICAgIFx0dHJhbnNmb3JtOiByb3RhdGVaKC00NWRlZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGB9PC9zdHlsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9MYXlvdXQ+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWFzb24oKSB7XHJcbiAgICBjb25zdCBtb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDFcclxuICAgIGxldCBzZWFzb24gPSAnJztcclxuICAgIHN3aXRjaChtb250aCkge1xyXG4gICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgc2Vhc29uID0gJ3dpbnRlcic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIHNlYXNvbiA9ICdzcHJpbmcnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjpcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICBzZWFzb24gPSAnc3VtbWVyJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgY2FzZSAxMDogXHJcbiAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgc2Vhc29uID0gJ2ZhbGwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlYXNvblxyXG59Il19 */\n/*@ sourceURL=C:\\Users\\010\\True Project\\clean\\renderer\\pages\\season.js */")));
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
//# sourceMappingURL=season.js.7694b77d58123492e1b9.hot-update.js.map