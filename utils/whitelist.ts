import {fromFileUrl, dirname} from "https://deno.land/std@0.57.0/path/mod.ts"

const decoder: TextDecoder = new TextDecoder('utf-8')

const whitelist: string[] = []

export async function fetchWhitelist(): Promise<void> {
    const buffer = await Deno.readFile(dirname(fromFileUrl(import.meta.url)) + '/../whitelist.txt')

    const text: string[] = decoder.decode(buffer).split('\n')

    whitelist.push(...text)

    whitelist.forEach((value, index) => {
        whitelist[index] = value.trim()
        if (value.length === 0) {
            whitelist.splice(index, 1)
        }
    })
}

export function isWhitelist(host: string): boolean {
    const sanitizedHost = host.trim().match(/^\S*/)

    return whitelist.some((whitelistedHost: string) => sanitizedHost?.indexOf(whitelistedHost) !== -1)
}
