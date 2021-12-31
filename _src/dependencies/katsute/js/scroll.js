---
layout: compress
---

"use strict";

if(window.location.hash != "")
    document
        .getElementById(window.location.hash.substring(1))
        .scrollIntoView();