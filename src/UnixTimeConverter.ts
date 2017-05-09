'use strict';

import * as vscode from 'vscode';

export class UnixTimeConverter
{
    /**
     * Convert Unix time to RFC3339 formatted string (UTC).
     */
    public static convertToRfc3339Utc(context: vscode.ExtensionContext) : void {
        UnixTimeConverter.insertStrings(s => UnixTimeConverter.toRfc3339Utc(Number.parseInt(s) * 1000));
    }

    /**
     * Convert Unix time to RFC3339 formatted string (Local time).
     */
    public static convertToRfc3339Local(context: vscode.ExtensionContext) : void {
        UnixTimeConverter.insertStrings(s => UnixTimeConverter.toRfc3339Local(Number.parseInt(s) * 1000));
    }

    /**
     * Convert selected text to Unix time.
     */
    public static convertToUnixTime(context: vscode.ExtensionContext) : void {
        UnixTimeConverter.insertUnixTimeStamp(s => Date.parse(s));
    }

    /**
     * Insert current UNIX timestamp on the selected positions.
     */
    public static insertUnixTimeStampNow(context: vscode.ExtensionContext) : void {
        UnixTimeConverter.insertUnixTimeStamp(s => Date.now());
    }

    /**
     * Insert UNIX timestamp on the selected positions.
     */
    public static insertUnixTimeStamp(sel2ms: (s: string) => number) : void {
        UnixTimeConverter.insertStrings(s => {
            let v = sel2ms(s);
            return Number.isNaN(v) ? null : ((v / 1000) | 0).toString();
        });
    }

    /**
     * Insert current timestamp (UTC) on the selected positions in RFC3339 format.
     */
    public static insertRfc3339NowUtc(context: vscode.ExtensionContext) : void {
        UnixTimeConverter.insertStrings(s => UnixTimeConverter.toRfc3339Utc(Date.now()));
    }

    /**
     * Insert current timestamp (Local time) on the selected positions in RFC3339 format.
     */
    public static insertRfc3339NowLocal(context: vscode.ExtensionContext) : void {
        UnixTimeConverter.insertStrings(s => UnixTimeConverter.toRfc3339Local(Date.now()));
    }

    /**
     * Insert string on each selection.
     */
    public static insertStrings(sel2str: (s: string) => string) : void {
        let textEditor = vscode.window.activeTextEditor;
        textEditor.edit(editor => {
            textEditor.selections.forEach(s => {
                let replacement = sel2str(textEditor.document.getText(s));
                if (replacement)
                    editor.replace(s, replacement);
            });
        });
    }

    static pad(n : any) : string { return n < 10 ? '0' + n : n; }

    static toRfc3339Utc(unixTimeMs: number) : string {
        if (!Number.isInteger(unixTimeMs))
            return null;
        let d = new Date(unixTimeMs);
        return d.getUTCFullYear() + '-'
            + UnixTimeConverter.pad(d.getUTCMonth() + 1) + '-'
            + UnixTimeConverter.pad(d.getUTCDate()) + 'T'
            + UnixTimeConverter.pad(d.getUTCHours()) + ':'
            + UnixTimeConverter.pad(d.getUTCMinutes()) + ':'
            + UnixTimeConverter.pad(d.getUTCSeconds()) + 'Z'
    }

    static toRfc3339Local(unixTimeMs: number) : string {
        if (!Number.isInteger(unixTimeMs))
            return null;
        let d = new Date(unixTimeMs);
        return d.getUTCFullYear() + '-'
            + UnixTimeConverter.pad(d.getMonth() + 1) + '-'
            + UnixTimeConverter.pad(d.getDate()) + 'T'
            + UnixTimeConverter.pad(d.getHours()) + ':'
            + UnixTimeConverter.pad(d.getMinutes()) + ':'
            + UnixTimeConverter.pad(d.getSeconds())
            + UnixTimeConverter.getTimeZoneSuffix(d);
    }

    static getTimeZoneSuffix(d : Date) : string {
        let off = d.getTimezoneOffset();
        let sign = off <= 0 ? '+' : '-';
        off = off < 0 ? -off : off;
        return sign
            + UnixTimeConverter.pad((off / 60) | 0) + ':'
            + UnixTimeConverter.pad(off % 60);
    }
}