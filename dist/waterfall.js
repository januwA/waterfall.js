(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.waterfall = {}));
}(this, (function (exports) { 'use strict';

  (function (WaterfallAlignment) {
      WaterfallAlignment[WaterfallAlignment["start"] = 0] = "start";
      WaterfallAlignment[WaterfallAlignment["center"] = 1] = "center";
      WaterfallAlignment[WaterfallAlignment["end"] = 2] = "end";
      WaterfallAlignment[WaterfallAlignment["between"] = 3] = "between";
  })(exports.WaterfallAlignment || (exports.WaterfallAlignment = {}));
  class Waterfall {
      constructor({ root, item, alignment = exports.WaterfallAlignment.start /*start|center|end|between*/, reverse = false /*true|false*/, resizeDebounce = 300 /*resize事件的防抖时间*/, resize = true }) {
          /**
           * * version [0.1.1]
           * * Github: https://github.com/januwA/waterfall.js
           * * Example: https://januwa.github.io/waterfall.js/example/index.html
           */
          this.version = "0.1.1";
          /**
           * * 子节点对齐方式
           * * default is [WaterfallAlignment.start]
           */
          this.alignment = exports.WaterfallAlignment.start;
          /**
           * * 每行是否颠倒
           * * default is [false]
           */
          this.reverse = false;
          /**
           * * [window.resize]事件防抖，毫秒为单位
           * * default is [300]
           */
          this.resizeDebounce = 300;
          /**
           * * 是否响应resize事件
           */
          this.resize = true;
          /**
           * * 开始设置瀑布流
           */
          this.draw = () => {
              const itemWidth = document.querySelector(this.item)
                  .clientWidth;
              const rootWidth = this.rootElm.clientWidth;
              // 获取图片的列数
              let column = parseInt((rootWidth / itemWidth).toString());
              // 高度数组
              let heightArr = [];
              for (let i = 0; i < column; i++) {
                  heightArr[i] = 0;
              }
              const overflowWidth = rootWidth - itemWidth * column;
              const columnWidth = rootWidth / column;
              const children = Array.from(this.rootElm.querySelectorAll(this.item));
              // 遍历所有图片进行定位处理
              for (let i = 0; i < children.length; i++) {
                  const item = children[i];
                  // item height
                  let itemHeight = item.clientHeight;
                  // 高度数组最小的高度
                  let minHeight = Math.min(...heightArr);
                  // 高度数组最小的高度的索引
                  let minIndex = heightArr.indexOf(minHeight);
                  item.style["position"] = "absolute";
                  item.style["top"] = minHeight + "px";
                  let _left;
                  let index = this.reverse ? column - 1 - minIndex : minIndex;
                  switch (this.alignment) {
                      case exports.WaterfallAlignment.start:
                          _left = index * itemWidth;
                          break;
                      case exports.WaterfallAlignment.center:
                          _left = index * itemWidth + overflowWidth / 2;
                          break;
                      case exports.WaterfallAlignment.end:
                          _left = index * itemWidth + overflowWidth;
                          break;
                      case exports.WaterfallAlignment.between:
                          let x = 0;
                          if (minIndex > 0) {
                              x = overflowWidth / column / (column - minIndex);
                          }
                          _left = index * columnWidth + x;
                          break;
                  }
                  item.style["left"] = _left + "px";
                  heightArr[minIndex] += itemHeight;
              }
          };
          if (!root || !item) {
              throw Error(`构建方式错误: 需要root和item参数!`);
          }
          this.root = root;
          this.item = item;
          this.alignment = alignment;
          this.reverse = reverse;
          this.resizeDebounce = resizeDebounce;
          this.resize = resize;
          const rootElm = document.querySelector(this.root);
          if (rootElm === null)
              throw Error(`没有找到根节点："${this.root}" 元素！`);
          this.rootElm = rootElm;
          if (this._getPV(this.rootElm, "position") === "static") {
              this.rootElm.style["position"] = "relative";
          }
          this._run();
      }
      /**
       * 一个防抖函数，在[t]时间内事件重复会被丢弃，只发出最新值
       * @param {*} fn 需要防抖的函数
       * @param {*} t  毫秒
       */
      debounce(fn, t = 1000) {
          let _debunce;
          return (...args) => {
              clearTimeout(_debunce);
              _debunce = setTimeout(() => {
                  fn.apply(this, args);
              }, t);
          };
      }
      /**
       * * 初始化
       */
      _run() {
          window.addEventListener("load", this.draw);
          if (this.resize) {
              this.debounceDraw = this.debounce(this.draw, this.resizeDebounce);
              window.addEventListener("resize", this.debounceDraw);
          }
      }
      /**
       * 获取dom元素的属性信息
       * @param el  dom元素
       * @param prop  属性名
       */
      _getPV(el, prop) {
          return document
              .defaultView.getComputedStyle(el, null)
              .getPropertyValue(prop);
      }
      /**
       * * 清理资源
       */
      dispose() {
          window.removeEventListener("load", this.draw);
          if (this.resize)
              window.removeEventListener("resize", this.debounceDraw);
      }
  }

  exports.Waterfall = Waterfall;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=waterfall.js.map
