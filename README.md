## ajanuw-waterfall.js

Waterfall flow layout


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

wf.draw();
```

- [example](https://januwa.github.io/waterfall.js/dist/index.html)
- [example code](https://github.com/januwA/waterfall.js/blob/master/index.html)

