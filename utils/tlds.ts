import {decode as punycodeDecode} from "https://deno.land/std@0.136.0/node/punycode.ts"

let tlds: string[] = [];

async function getTlds(): Promise<string[]> {
    const res = await fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt')

    const body: string = await res.text()

    return body.split('\n').slice(1).map((tld: string) => {
        if (tld.startsWith('XN')) {
            try {
                punycodeDecode(tld)
            } catch (_error) {
                return tld
            }
        } else {
            return tld
        }
    }) as string[]
}

export async function fetchTlds() {
    tlds = await getTlds()
}

export function isTld(domain: string) {
    return tlds.includes(domain)
}
