import {fromFileUrl, dirname} from "https://deno.land/std@0.57.0/path/mod.ts"

const decoder: TextDecoder = new TextDecoder('utf-8')

const whitelist: string[] = []

export async function fetchWhitelist(): Promise<void> {
    const buffer = await Deno.readFile(dirname(fromFileUrl(import.meta.url)) + '/../whitelist.txt')

    const text: string[] = decoder.decode(buffer).split('\n')

    whitelist.push(...text)
}

export function isWhitelist(domain: string): boolean {
    return whitelist.some((whitelistedDomain: string) => domain.indexOf(whitelistedDomain) !== -1)
}
