// Copyright (C) Katsute 2022

import { https } from 'follow-redirects';
import fs from "fs";
import path from "path";

const jekyll_compress_version: string = "v3.1.0";

class Main {

    public static async main(): Promise<void> {
        /* CNAME */ {
            fs.copyFileSync(path.join(__dirname, "CNAME"), path.join(__dirname, "_src", "CNAME"));
        }

        /* layouts */ {
            const layouts: string = path.join(__dirname, "_layouts");

            fs.existsSync(layouts) || fs.mkdirSync(layouts);

            https.get(`https://github.com/penibelst/jekyll-compress-html/releases/download/${jekyll_compress_version}/compress.html`, (response) => {
                response.pipe(fs.createWriteStream(path.join(layouts, "compress.html")));
            });
        }

        /* readmes */ {
            const readme: string = path.join(__dirname, "_includes", "readme");

            fs.existsSync(readme) || fs.mkdirSync(readme);

            const repos: string[] = [
                "KatsuteDev/Desktop-Flick",
                "KatsuteDev/JCore",
                "KatsuteDev/Mal4J",
                "KatsuteDev/Stop-Chrome",
                "Katsute/GitHub-Red-Issues",
                "Ktt-Development/rexedia",
                "Ktt-Development/simplehttpserver"
            ];

            for(const repo of repos){
                https.get(`https://raw.githubusercontent.com/${repo}/main/README.md`, (response) => {
                    response.pipe(fs.createWriteStream(path.join(readme, `${repo.replace('/', '-')}.md`)));
                });
            }
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