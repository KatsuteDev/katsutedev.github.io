// Copyright (C) Katsute 2022

import { https } from 'follow-redirects';
import fs, { WriteStream } from "fs";
import path from "path";

const version: string = "v3.1.0";

class Main {

    public static async main(): Promise<void> {
        const layouts: string = path.join(__dirname, "_layouts");

        fs.existsSync(layouts) || fs.mkdirSync(layouts);

        const file: WriteStream = fs.createWriteStream(path.join(layouts, "compress.html"));
        https.get(`https://github.com/penibelst/jekyll-compress-html/releases/download/${version}/compress.html`, (response) => {
            response.pipe(file);
        });
    }

}

process.on("unhandledRejection", (error: Error, promise: any) => {
    console.error(`Unhandled rejection at:\n  Promise ${promise}\n  ${error.stack}`);
    process.exit(-1);
});

Main.main().catch((error: Error) => {
    console.error(error.stack!);
    process.exit(-1);
});