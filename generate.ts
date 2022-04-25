import {getHosts} from './utils/mod.ts'

(async () => {
    const hosts = getHosts()
    
    const filename = 'blocked-names.txt'

    Deno.removeSync(filename)

    for await (const host of hosts) {
        const encoder = new TextEncoder();
        const data = encoder.encode(host);
        
        Deno.writeFile(filename, data, {
            append: true
        })
    }
})()
