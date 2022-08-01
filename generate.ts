import {getHosts} from './utils/mod.ts'

(async () => {
    const hosts = getHosts()
    
    const filename = 'blocked-names.txt'

    try {
        await Deno.stat(filename)
        Deno.removeSync(filename)
    // deno-lint-ignore no-empty
    } catch(_error) {}

    const encoder = new TextEncoder();

    for await (const host of hosts) {
        const data = encoder.encode(host + "\n");

        await Deno.writeFile(filename, data, {
            append: true
        })
    }
})()
