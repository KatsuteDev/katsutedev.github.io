// Copyright (C) Katsute 2022

import { https } from 'follow-redirects';
import fs, { WriteStream } from "fs";
import path from "path";

const jekyll_compress_version: string = "v3.1.0";

class Main {

    public static async main(): Promise<void> {
        /* layouts */ {
            const layouts: string = path.join(__dirname, "_layouts");

            fs.existsSync(layouts) || fs.mkdirSync(layouts);

            const file: WriteStream = fs.createWriteStream(path.join(layouts, "compress.html"));
            https.get(`https://github.com/penibelst/jekyll-compress-html/releases/download/${jekyll_compress_version}/compress.html`, (response) => {
                response.pipe(file);
            });
        }

        /* readmes */ {
            const readme: string = path.join(__dirname, "_includes", "readme");

            fs.existsSync(readme) || fs.mkdirSync(readme);
        }
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