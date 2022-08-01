import {fetchTlds, isTld} from './tlds.ts'
import {fetchWhitelist, isWhitelist} from './whitelist.ts'

async function* getHosts(): AsyncGenerator<string, void, undefined> {
    await fetchTlds()
    await fetchWhitelist()

    const response: Response = await fetch('https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts')

    const responseText: string = await response.text()

    const hostsRaw: string = responseText.substring(responseText.indexOf('# Start StevenBlack'))

    const regex = /(?<=0\.0\.0\.0 )(.*)\n/g

    const hosts = hostsRaw.match(regex) ?? []

    for (const host of hosts) {
        if (host.length === 0) {
            continue
        }

        const domain = host.trim()

        if (isTld(domain)) {
            continue
        }

        if (isWhitelist(domain)) {
            continue
        }

        yield domain
    }
}

export default getHosts
