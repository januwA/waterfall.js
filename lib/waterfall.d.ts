declare enum WaterfallAlignment {
    start = 0,
    center = 1,
    end = 2,
    between = 3
}
interface WaterfallOptions {
    root: string;
    item: string;
    alignment?: WaterfallAlignment;
    reverse?: boolean;
    resizeDebounce?: number;
    resize?: boolean;
}
declare class Waterfall {
    /**
     * * 根元素节点
     */
    rootElm: HTMLElement;
    /**
     * * version [0.1.1]
     * * Github: https://github.com/januwA/waterfall.js
     * * Example: https://januwa.github.io/waterfall.js/example/index.html
     */
    version: string;
    /**
     * * 根节点选择器
     */
    root: string;
    /**
     * * 子节点选择器
     */
    item: string;
    /**
     * * 子节点对齐方式
     * * default is [WaterfallAlignment.start]
     */
    alignment: WaterfallAlignment;
    /**
     * * 每行是否颠倒
     * * default is [false]
     */
    reverse: boolean;
    /**
     * * [window.resize]事件防抖，毫秒为单位
     * * default is [300]
     */
    resizeDebounce: number;
    /**
     * * 是否响应resize事件
     */
    resize: boolean;
    constructor({ root, item, alignment, reverse, resizeDebounce, resize }: WaterfallOptions);
    /**
     * 一个防抖函数，在[t]时间内事件重复会被丢弃，只发出最新值
     * @param {*} fn 需要防抖的函数
     * @param {*} t  毫秒
     */
    debounce(fn: Function, t?: number): Function;
    private debounceDraw;
    /**
     * * 初始化
     */
    private _run;
    /**
     * 获取dom元素的属性信息
     * @param el  dom元素
     * @param prop  属性名
     */
    private _getPV;
    /**
     * * 开始设置瀑布流
     */
    draw: () => void;
    /**
     * * 清理资源
     */
    dispose(): void;
}
export { WaterfallAlignment, Waterfall };
