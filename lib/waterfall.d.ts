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
}
declare class Waterfall {
    private rootElm;
    version: string;
    root: string;
    item: string;
    alignment: WaterfallAlignment;
    reverse: boolean;
    resizeDebounce: number;
    constructor({ root, item, alignment, reverse, resizeDebounce }: WaterfallOptions);
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
export { WaterfallAlignment, WaterfallOptions, Waterfall };
