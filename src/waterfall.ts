export enum WaterfallAlignment {
  start,
  center,
  end,
  between,
}
interface WaterfallOptions {
  root: string;
  item: string;
  alignment?: WaterfallAlignment;
  reverse?: boolean;
  resizeDebounce?: number;
  resize?: boolean;
}

export class Waterfall {
  /**
   * * 根元素节点
   */
  public readonly rootElm: HTMLElement;

  /**
   * * 根节点选择器
   */
  public readonly root: string;

  /**
   * * 子节点选择器
   */
  public readonly item: string;

  /**
   * * 子节点对齐方式
   * * default is [WaterfallAlignment.start]
   */
  public alignment: WaterfallAlignment;

  /**
   * * 每行是否颠倒
   * * default is [false]
   */
  public reverse: boolean;

  /**
   * * [window.resize]事件防抖，毫秒为单位
   * * default is [300]
   */
  public resizeDebounce: number;

  /**
   * * 是否响应resize事件
   */
  public resize: boolean;

  constructor(opt: WaterfallOptions) {
    if (!opt.root || !opt.item) {
      throw Error(`构建方式错误: 需要root和item参数!`);
    }
    this.root = opt.root;
    this.item = opt.item;
    this.alignment = opt.alignment ?? WaterfallAlignment.start;
    this.reverse = opt.reverse ?? false;
    this.resizeDebounce = opt.resizeDebounce ?? 300;
    this.resize = opt.resize ?? true;

    const rootElm = document.querySelector<HTMLElement>(this.root);
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
  public debounce(fn: Function, t = 1000): (this: Window, ev: UIEvent) => any {
    let _debunce: number;
    return (...args: any[]) => {
      clearTimeout(_debunce);
      _debunce = window.setTimeout(() => {
        fn.apply(this, args);
      }, t);
    };
  }

  private debounceDraw?: (this: Window, ev: UIEvent) => any;
  /**
   * * 初始化
   */
  private _run(): void {
    this.draw();
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
  private _getPV(el: Element, prop: string) {
    return document
      .defaultView!.getComputedStyle(el, null)
      .getPropertyValue(prop);
  }

  /**
   * * 开始设置瀑布流
   */
  public draw = (): boolean => {
    const itemWidth = this.rootElm.querySelector<HTMLElement>(
      this.item
    )?.clientWidth;

    if (!itemWidth) return false;

    const rootWidth: number = this.rootElm.clientWidth;
    // 获取图片的列数
    const column = parseInt((rootWidth / itemWidth).toString());

    // 高度数组
    const heightArr = new Array(column).fill(0);

    const overflowWidth = rootWidth - itemWidth * column;
    const columnWidth = rootWidth / column;

    const children = Array.from<HTMLElement>(
      this.rootElm.querySelectorAll(this.item)
    );

    // 遍历所有图片进行定位处理
    for (const item of children) {
      // item height
      const itemHeight = item.clientHeight;

      // 高度数组最小的高度
      const minHeight = Math.min(...heightArr);

      // 高度数组最小的高度的索引
      const minIndex = heightArr.indexOf(minHeight);

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
          if (minIndex > 0) x = overflowWidth / column / (column - minIndex);
          _left = index * columnWidth + x;
          break;
      }
      item.style["left"] = _left + "px";
      heightArr[minIndex] += itemHeight;
    }
    return true;
  };

  /**
   * * 清理资源
   */
  public dispose = (): void => {
    if (this.resize && this.debounceDraw)
      window.removeEventListener("resize", this.debounceDraw);
  };
}
