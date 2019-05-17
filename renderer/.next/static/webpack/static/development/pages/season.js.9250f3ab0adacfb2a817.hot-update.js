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
        className: "jsx-1449100547"
      }, this.state.info ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        id: "info",
        className: "jsx-1449100547"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        onClick: function onClick() {
          _this2.handleInfo(false);
        },
        className: "jsx-1449100547" + " " + "exit"
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "jsx-1449100547" + " " + "title"
      }, this.state.info.title), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "jsx-1449100547" + " " + "synopsis"
      }, this.state.info.synopsis), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "jsx-1449100547" + " " + "data"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "jsx-1449100547"
      }, "Episodes: ", this.state.info.episodes), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "jsx-1449100547"
      }, "Genres: ", this.state.info.genres.map(function (val) {
        return val.name;
      }).join(', ')))) : null, this.state.animesTV.map(function (val, index) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Cadre__WEBPACK_IMPORTED_MODULE_11__["default"], {
          info: _this2.handleInfo,
          anime: val,
          key: val.mal_id
        });
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_8___default.a, {
        id: "1449100547"
      }, "#grid.jsx-1449100547{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-around;-webkit-justify-content:space-around;-ms-flex-pack:space-around;justify-content:space-around;position:relative;}#info.jsx-1449100547{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;background-color:#000000de;padding:0 50px;box-sizing:border-box;}.title.jsx-1449100547{text-align:center;font-weight:600;font-size:2rem;padding:50px 0;}.synopsis.jsx-1449100547{font-size:1.05rem;text-indent:2rem;max-width:800px;margin:auto;margin-bottom:20px;}.exit.jsx-1449100547{width:50px;height:50px;position:fixed;top:20px;left:20px;cursor:pointer;}.exit.jsx-1449100547:before,.exit.jsx-1449100547:after{content:'';width:40px;height:2px;background-color:#fff;position:absolute;top:calc(25px - 1px);left:5px;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;}.exit.jsx-1449100547:before{-webkit-transform:rotateZ(45deg);-ms-transform:rotateZ(45deg);transform:rotateZ(45deg);}.exit.jsx-1449100547:after{-webkit-transform:rotateZ(-45deg);-ms-transform:rotateZ(-45deg);transform:rotateZ(-45deg);}.data.jsx-1449100547{max-width:800px;margin:auto;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcMDEwXFxUcnVlIFByb2plY3RcXGNsZWFuXFxyZW5kZXJlclxccGFnZXNcXHNlYXNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwRHNCLEFBRzJCLEFBTUssQUFXQSxBQU1BLEFBT1AsQUFTQSxBQVVjLEFBR0MsQUFHVixXQXhCSixBQVNELEtBZ0JDLEVBakROLEFBV0ksQUFNQyxJQWlCQSxDQVRJLENBeEJSLElBaURSLEdBaERZLEVBaUNXLENBdkJiLENBTUMsR0FRRCxJQXZCRyxLQXdCRixFQWRELEVBTUgsR0FmSSxDQWdDUSxFQVJILE1BUkYsQ0FmYyxBQVM1QixRQWVBLENBUXNCLENBM0NOLFFBMkJoQixLQXNCQSxHQUdBLENBeENnQixHQWdDTixTQUNlLEdBaENSLHNCQUNqQixHQWI4Qix3REE2QzlCLG1FQTVDbUIsa0JBQ25CIiwiZmlsZSI6IkM6XFxVc2Vyc1xcMDEwXFxUcnVlIFByb2plY3RcXGNsZWFuXFxyZW5kZXJlclxccGFnZXNcXHNlYXNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4vLi4vY29tcG9uZW50cy9NeUxheW91dCdcclxuaW1wb3J0IENhZHJlIGZyb20gJy4vLi4vY29tcG9uZW50cy9DYWRyZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAvKnN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoKXtcclxuICBcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmppa2FuLm1vZS92My9zZWFzb24vJHsobmV3IERhdGUoKSkuZ2V0WWVhcigpICsgMTkwMH0vJHtnZXRTZWFzb24oKX1gKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG5cclxuICAgIGNvbnN0IGFuaW1lc1RWID0gZGF0YS5hbmltZS5maWx0ZXIodmFsID0+IHZhbC50eXBlID09PSAnVFYnKVxyXG4gICAgY29uc29sZS5sb2coYW5pbWVzVFYpXHJcbiAgICByZXR1cm4geyBhbmltZXNUViB9XHJcbiAgfSovXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgXHRhbmltZXNUVjogW10sXHJcbiAgICBcdGluZm86IGZhbHNlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5oYW5kbGVJbmZvID0gdGhpcy5oYW5kbGVJbmZvLmJpbmQodGhpcylcclxuICB9XHJcbiAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5qaWthbi5tb2UvdjMvc2Vhc29uLyR7KG5ldyBEYXRlKCkpLmdldFllYXIoKSArIDE5MDB9LyR7Z2V0U2Vhc29uKCl9YClcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuXHJcbiAgICBjb25zdCBhbmltZXNUViA9IGRhdGEuYW5pbWUuZmlsdGVyKHZhbCA9PiB2YWwudHlwZSA9PT0gJ1RWJylcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBhbmltZXNUViB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlSW5mbyhpbmZvKXtcclxuICBcdHRoaXMuc2V0U3RhdGUoeyBpbmZvIH0pXHJcbiAgXHRjb25zb2xlLmxvZyhpbmZvKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPExheW91dD5cclxuICAgICAgICA8ZGl2IGlkPVwiZ3JpZFwiPlxyXG4gICAgICAgICAgeyB0aGlzLnN0YXRlLmluZm8gPyBcclxuICAgICAgICAgIFx0PGRpdiBpZD1cImluZm9cIj5cclxuICAgICAgICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImV4aXRcIiBvbkNsaWNrPXsoKT0+eyB0aGlzLmhhbmRsZUluZm8oZmFsc2UpIH19PjwvZGl2PlxyXG4gICAgICAgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj57dGhpcy5zdGF0ZS5pbmZvLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwic3lub3BzaXNcIj57dGhpcy5zdGF0ZS5pbmZvLnN5bm9wc2lzfTwvZGl2PlxyXG4gICAgICAgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwiZGF0YVwiPlxyXG4gICAgICAgICAgXHRcdFx0PGRpdj5FcGlzb2Rlczoge3RoaXMuc3RhdGUuaW5mby5lcGlzb2Rlc308L2Rpdj5cclxuICAgICAgICAgIFx0XHRcdDxkaXY+R2VucmVzOiB7dGhpcy5zdGF0ZS5pbmZvLmdlbnJlcy5tYXAodmFsID0+IHZhbC5uYW1lKS5qb2luKCcsICcpfTwvZGl2PlxyXG4gICAgICAgICAgXHRcdDwvZGl2PlxyXG4gICAgICAgICAgXHQ8L2Rpdj4gOlxyXG4gICAgICAgICAgXHRudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICBcdHRoaXMuc3RhdGUuYW5pbWVzVFYubWFwKCh2YWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBcdFx0cmV0dXJuIChcclxuICAgICAgICAgIFx0XHRcdDxDYWRyZSBpbmZvPXt0aGlzLmhhbmRsZUluZm99IGFuaW1lPXt2YWx9IGtleT17dmFsLm1hbF9pZH0gLz5cclxuICAgICAgICAgIFx0XHQpXHJcbiAgICAgICAgICBcdH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICA8c3R5bGUganN4PntgXHJcbiAgICAgICAgICAgICNncmlkIHtcclxuICAgICAgICAgICAgXHRkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBcdGZsZXgtd3JhcDogd3JhcDtcclxuICAgICAgICAgICAgXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgICAgICAgICAgXHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgI2luZm8ge1xyXG4gICAgICAgICAgICBcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgXHR0b3A6IDA7XHJcbiAgICAgICAgICAgIFx0bGVmdDogMDtcclxuICAgICAgICAgICAgXHR3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgXHRoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIFx0ei1pbmRleDogMTtcclxuICAgICAgICAgICAgXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwZGU7XHJcbiAgICAgICAgICAgIFx0cGFkZGluZzogMCA1MHB4O1xyXG4gICAgXHRcdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAudGl0bGUge1xyXG4gICAgICAgICAgICBcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdFx0ICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcblx0XHRcdCAgICBmb250LXNpemU6IDJyZW07XHJcblx0XHRcdCAgICBwYWRkaW5nOiA1MHB4IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLnN5bm9wc2lzIHtcclxuICAgICAgICAgICAgXHRmb250LXNpemU6IDEuMDVyZW07XHJcblx0XHRcdCAgICB0ZXh0LWluZGVudDogMnJlbTtcclxuXHRcdFx0ICAgIG1heC13aWR0aDogODAwcHg7XHJcblx0XHRcdCAgICBtYXJnaW46IGF1dG87XHJcblx0XHRcdCAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5leGl0IHtcclxuICAgICAgICAgICAgXHR3aWR0aDogNTBweDtcclxuICAgICAgICAgICAgXHRoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgICAgIFx0cG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgICAgICBcdHRvcDogMjBweDtcclxuICAgICAgICAgICAgXHRsZWZ0OiAyMHB4O1xyXG4gICAgICAgICAgICBcdGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuZXhpdDpiZWZvcmUsXHJcbiAgICAgICAgICAgIC5leGl0OmFmdGVyIHtcclxuICAgICAgICAgICAgXHRjb250ZW50OiAnJztcclxuICAgICAgICAgICAgXHR3aWR0aDogNDBweDtcclxuICAgICAgICAgICAgXHRoZWlnaHQ6IDJweDtcclxuICAgICAgICAgICAgXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgXHR0b3A6IGNhbGMoMjVweCAtIDFweCk7XHJcbiAgICAgICAgICAgIFx0bGVmdDogNXB4O1xyXG4gICAgICAgICAgICBcdHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuZXhpdDpiZWZvcmUge1xyXG4gICAgICAgICAgICBcdHRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLmV4aXQ6YWZ0ZXIge1xyXG4gICAgICAgICAgICBcdHRyYW5zZm9ybTogcm90YXRlWigtNDVkZWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5kYXRhIHtcclxuICAgICAgICAgICAgXHRtYXgtd2lkdGg6IDgwMHB4O1xyXG4gICAgICAgICAgICBcdG1hcmdpbjogYXV0bztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgYH08L3N0eWxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0xheW91dD5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlYXNvbigpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMVxyXG4gICAgbGV0IHNlYXNvbiA9ICcnO1xyXG4gICAgc3dpdGNoKG1vbnRoKSB7XHJcbiAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICBzZWFzb24gPSAnd2ludGVyJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgc2Vhc29uID0gJ3NwcmluZyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgIGNhc2UgNzpcclxuICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgIHNlYXNvbiA9ICdzdW1tZXInO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTpcclxuICAgICAgICBjYXNlIDEwOiBcclxuICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICBzZWFzb24gPSAnZmFsbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2Vhc29uXHJcbn0iXX0= */\n/*@ sourceURL=C:\\Users\\010\\True Project\\clean\\renderer\\pages\\season.js */")));
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
//# sourceMappingURL=season.js.9250f3ab0adacfb2a817.hot-update.js.map