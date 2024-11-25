```
▗▄▄▖  ▄▄▄   ▄▄▄  █  ▄
▐▌ ▐▌█   █ █   █ █▄▀
▐▛▀▚▖▀▄▄▄▀ ▀▄▄▄▀ █ ▀▄
▐▙▄▞▘            █  █



 ▄▄▄  ▗▞▀▀▘
█   █ ▐▌
▀▄▄▄▀ ▐▛▀▘
      ▐▌



▗▖  ▗▖▗▞▀▜▌▄▄▄▄  ▗▞▀▚▖ ▄▄▄
▐▛▚▖▐▌▝▚▄▟▌█ █ █ ▐▛▀▀▘▀▄▄
▐▌ ▝▜▌     █   █ ▝▚▄▄▖▄▄▄▀
▐▌  ▐▌
```

Consistently assign memorable names to things. Takes strings or BigInts as
inputs, and assigns one of several hundred trillion unique names. For example:


```typescript
import { name } from "book-of-names";

name.str("263d306d-1bc3-4d74-b3ca-e3d926f518cb");
// Returns: "Naughty elephantine holographic Croatian Bezaleel"

name.bigint(20n);
// Returns: Newborn Aboriginal Aaron
```
