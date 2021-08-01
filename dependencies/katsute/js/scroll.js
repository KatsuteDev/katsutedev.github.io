---
layout: compress
---

"use strict";

/* auto scroll id */ {
    if(window.location.hash != "")
        document.getElementById(window.location.hash.substring(1)).scrollIntoView();
}