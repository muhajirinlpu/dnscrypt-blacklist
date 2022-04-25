import {getHosts} from './utils/mod.ts'

(async () => {
    const hosts = getHosts()
    
    const filename = 'blocked-names.txt'

    try {
        await Deno.stat(filename)
        Deno.removeSync(filename)
    // deno-lint-ignore no-empty
    } catch(_error) {}

    for await (const host of hosts) {
        const encoder = new TextEncoder();
        const data = encoder.encode(host);
        
        Deno.writeFile(filename, data, {
            append: true
        })
    }
})()
