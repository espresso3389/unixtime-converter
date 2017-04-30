'use strict';

import * as vscode from 'vscode';

export class UnixTimeConverter
{
    public static convertToRfc3339(context: vscode.ExtensionContext) : void {
        let textEditor = vscode.window.activeTextEditor;
        textEditor.edit(editor => {
            textEditor.selections.forEach(s => {
                let time_t = Number.parseInt(textEditor.document.getText(s));
                let replacement: string = null;
                if (replacement)
                    editor.replace(s, replacement);
            });
        });
    }

    public static convertToUnixTime(context: vscode.ExtensionContext) : void {
        let textEditor = vscode.window.activeTextEditor;
        textEditor.edit(editor => {
            textEditor.selections.forEach(s => {
                let rfc3339 = textEditor.document.getText(s);
                let replacement: string = null;
                if (replacement)
                    editor.replace(s, replacement);
            });
        });
    }
}