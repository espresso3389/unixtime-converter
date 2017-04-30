'use strict';

import * as vscode from 'vscode';

export class UnixTimeConverter
{
    public static convertToRfc3339(context: vscode.ExtensionContext) : void {
        let textEditor = vscode.window.activeTextEditor;
        textEditor.edit(editor => {
            textEditor.selections.forEach(s => {
                let replacement = UnixTimeConverter.toRfc3339Utc(
                    new Date(Number.parseInt(textEditor.document.getText(s))));
                if (replacement)
                    editor.replace(s, replacement);
            });
        });
    }

    public static convertToRfc3339Local(context: vscode.ExtensionContext) : void {
        let textEditor = vscode.window.activeTextEditor;
        textEditor.edit(editor => {
            textEditor.selections.forEach(s => {
                let replacement = UnixTimeConverter.toRfc3339Local(
                    new Date(Number.parseInt(textEditor.document.getText(s))));
                if (replacement)
                    editor.replace(s, replacement);
            });
        });
    }

    public static convertToUnixTime(context: vscode.ExtensionContext) : void {
        let textEditor = vscode.window.activeTextEditor;
        textEditor.edit(editor => {
            textEditor.selections.forEach(s => {
                let replacement = Date.parse(textEditor.document.getText(s)).toString();
                if (replacement)
                    editor.replace(s, replacement);
            });
        });
    }

    static pad(n : any) : string { return n < 10 ? '0' + n : n; }

    static toRfc3339Utc(d) : string {
        return d.getUTCFullYear() + '-'
            + UnixTimeConverter.pad(d.getUTCMonth() + 1) + '-'
            + UnixTimeConverter.pad(d.getUTCDate()) + 'T'
            + UnixTimeConverter.pad(d.getUTCHours()) + ':'
            + UnixTimeConverter.pad(d.getUTCMinutes()) + ':'
            + UnixTimeConverter.pad(d.getUTCSeconds()) + 'Z'
    }

    static getTimeZoneSuffix(d) : string {
        let off = d.getTimezoneOffset();
        let sign = off <= 0 ? '+' : '-';
        off = off < 0 ? -off : off;
        return sign
            + UnixTimeConverter.pad((off / 60) | 0) + ':'
            + UnixTimeConverter.pad(off % 60);
    }

    static toRfc3339Local(d) : string {
        return d.getUTCFullYear() + '-'
            + UnixTimeConverter.pad(d.getMonth() + 1) + '-'
            + UnixTimeConverter.pad(d.getDate()) + 'T'
            + UnixTimeConverter.pad(d.getHours()) + ':'
            + UnixTimeConverter.pad(d.getMinutes()) + ':'
            + UnixTimeConverter.pad(d.getSeconds())
            + UnixTimeConverter.getTimeZoneSuffix(d);
    }
}