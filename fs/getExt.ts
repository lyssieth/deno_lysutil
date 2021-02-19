export class GetExtResult {
    private _name: string;
    private _ext: string;
    private _startedWithDot: boolean;

    constructor(name: string, ext: string, startedWithDot: boolean = false) {
        this._name = name;
        this._ext = ext;
        this._startedWithDot = startedWithDot;
    }

    public get name(): string {
        return this._name;
    }

    public get ext(): string {
        return this._ext;
    }

    public get startedWithDot(): boolean {
        return this._startedWithDot;
    }
}

export function getExt(path: string): GetExtResult {
    const files = path.split("/");
    const last = files[files.length - 1];
    const split = last.split(".");
    let name = "";
    let ext = "";
    while (split.length > 1) {
        if (name.length > 0) name += ".";
        name += split.shift();
    }
    if (name.length < 1) {
        name = split.shift() as string;
    } else {
        ext = split.shift() as string;
    }

    return new GetExtResult(name, ext, last.startsWith("."));
}

import { assertEquals } from "https://deno.land/std@0.87.0/testing/asserts.ts";

Deno.test("getExt(potato.json)", () => {
    const res = getExt("potato.json");
    assertEquals(res.name, "potato");
    assertEquals(res.ext, "json");
    assertEquals(res.startedWithDot, false);
});

Deno.test("getExt(a.b.c.d.e.f.g)", () => {
    const res = getExt("a.b.c.d.e.f.g");
    assertEquals(res.name, "a.b.c.d.e.f");
    assertEquals(res.ext, "g");
    assertEquals(res.startedWithDot, false);
});

Deno.test("getExt(no_ext)", () => {
    const res = getExt("no_ext");
    assertEquals(res.name, "no_ext");
    assertEquals(res.ext, "");
    assertEquals(res.startedWithDot, false);
});

Deno.test("getExt(.dot_prefix)", () => {
    const res = getExt(".dot_prefix");
    assertEquals(res.name, "dot_prefix");
    assertEquals(res.ext, "");
    assertEquals(res.startedWithDot, true);
});
