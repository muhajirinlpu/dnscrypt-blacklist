import {fetchTlds, isTld} from './tlds.ts'


async function* getHosts(): AsyncGenerator<string, void, undefined> {
    await fetchTlds()

    const response: Response = await fetch('https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts')

    const responseText: string = await response.text()

    const hostsRaw: string = responseText.substring(responseText.indexOf('# Start StevenBlack'))
    
    const regex = /(?<=0\.0\.0\.0\ )(.*)\n/g

    const hosts = hostsRaw.match(regex) ?? []

    for(const host of hosts) {
        if (host.length === 0) {
            continue
        } 

        if (isTld(host)) {
            continue
        }

        yield host
    }
}

export default getHosts
