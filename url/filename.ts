import { assertEquals } from "../deps.ts";

export function filename(link: string): string {
    const url = new URL(link);
    const split = url.pathname.split("/");

    return split[split.length - 1];
}

Deno.test("filename: link with one path element", () => {
    const res = filename("https://example.com/standard.json");

    assertEquals(res, "standard.json");
});

Deno.test("filename: link with more than one path element", () => {
    const res = filename("https://example.com/second/second.json");

    assertEquals(res, "second.json");
});

Deno.test("filename: absurdly long link with some stupid characters", () => {
    const res = filename(
        "https://example.com/absurdly/long/path/name/here/@with/...some/1239g9/stupid/characters/file.json"
    );

    assertEquals(res, "file.json");
});

Deno.test("filename: link with query", () => {
    const res = filename(
        "https://example.com/query.json?q=how+to+query+using+fetch"
    );

    assertEquals(res, "query.json");
});
