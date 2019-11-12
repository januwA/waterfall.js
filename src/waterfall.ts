enum WaterfallAlignment {
  start,
  center,
  end,
  between
}
interface WaterfallOptions {
  root: string;
  item: string;
  alignment?: WaterfallAlignment;
  reverse?: boolean;
  resizeDebounce?: number;
}

class Waterfall {
  private rootElm: HTMLElement;

  public version: string = "0.1.0";

  // 根节点选择器
  public root: string;

  // 子节点选择器
  public item: string;

  // 子节点对齐方式
  public alignment = WaterfallAlignment.start;

  // 每行是否颠倒
  public reverse = false;

  // [window.resize]事件防抖事件，毫秒为单位
  public resizeDebounce = 300;
  constructor({
    root,
    item,
    alignment = WaterfallAlignment.start /*start|center|end|between*/,
    reverse = false /*true|false*/,
    resizeDebounce = 300 /*resize事件的防抖时间*/
  }: WaterfallOptions) {
    if (!root || !item) {
      throw Error(`构建方式错误: 需要root和item参数!`);
    }
    this.root = root;
    this.item = item;
    this.alignment = alignment;
    this.reverse = reverse;
    this.resizeDebounce = resizeDebounce;

    const rootElm: HTMLElement | null = document.querySelector<HTMLElement>(
      this.root
    );
    if (rootElm === null) throw Error(`没有找到根节点："${this.root}" 元素！`);
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
  public debounce(fn: Function, t = 1000): Function {
    let _debunce: number;
    return (...args: any[]) => {
      clearTimeout(_debunce);
      _debunce = setTimeout(() => {
        fn.apply(this, args);
      }, t);
    };
  }

  private debounceDraw: any;
  /**
   * * 初始化
   */
  private _run(): void {
    window.addEventListener("load", this.draw);
    this.debounceDraw = this.debounce(this.draw, this.resizeDebounce);
    window.addEventListener("resize", this.debounceDraw);
  }

  private _getPV(el: Element, prop: string) {
    return document
      .defaultView!.getComputedStyle(el, null)
      .getPropertyValue(prop);
  }

  /**
   * * 开始设置瀑布流
   */
  public draw = () => {
    const itemWidth: number = document.querySelector<HTMLElement>(this.item)!
      .clientWidth;
    const rootWidth: number = this.rootElm.clientWidth;
    // 获取图片的列数
    let column = parseInt((rootWidth / itemWidth).toString());

    // 高度数组
    let heightArr = [];
    for (let i = 0; i < column; i++) {
      heightArr[i] = 0;
    }

    const overflowWidth = rootWidth - itemWidth * column;
    const columnWidth = rootWidth / column;

    const children = Array.from<HTMLElement>(
      this.rootElm.querySelectorAll(this.item)
    );

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
        case WaterfallAlignment.start:
          _left = index * itemWidth;
          break;
        case WaterfallAlignment.center:
          _left = index * itemWidth + overflowWidth / 2;
          break;
        case WaterfallAlignment.end:
          _left = index * itemWidth + overflowWidth;
          break;
        case WaterfallAlignment.between:
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

  /**
   * * 清理资源
   */
  public dispose(): void {
    window.removeEventListener("load", this.draw);
    window.removeEventListener("resize", this.debounceDraw);
  }
}

export { WaterfallAlignment, WaterfallOptions, Waterfall };