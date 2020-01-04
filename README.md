## ajanuw-waterfall.js
瀑布流布局库


## install
```
npm i ajanuw-waterfall.js
```

## Use
```ts
import { Waterfall, WaterfallAlignment } from "ajanuw-waterfall.js";

const wf = new Waterfall({
  root: ".box",
  item: ".item",
  alignment: WaterfallAlignment.start,
  reverse: true
});
```

## Used in browser
```html
<style>
.item {
  width: 200px;
  padding: 6px;
  box-sizing: border-box;
  transition: all 1s;
}
</style>

<div class="box">
  <img class="item" src="https://i.loli.net/2019/11/07/TvjyJgGObWcBLAN.jpg"/>
  ...
</div>

<script src="waterfall.js"></script>
<script>
  const { Waterfall, WaterfallAlignment } = waterfall;
  const wf = new Waterfall({
    root: ".box",
    item: ".item",
    alignment: WaterfallAlignment.start,
    reverse: true
  });

  setTimeout(() => {
    wf.reverse = false;
    wf.alignment = WaterfallAlignment.center;
    wf.draw();
  }, 3000);

  setTimeout(() => {
    wf.reverse = true;
    wf.alignment = WaterfallAlignment.end;
    wf.draw();
  }, 6000);

  setTimeout(() => {
    wf.reverse = false;
    wf.alignment = WaterfallAlignment.between;
    wf.draw();
  }, 9000);
</script>
```


