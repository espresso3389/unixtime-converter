'use strict';
import * as vscode from 'vscode';
import * as fr from './UnixTimeConverter';

export function activate(context: vscode.ExtensionContext) {

    interface Commands {
        id: string;
        command: (context: vscode.ExtensionContext) => any;
    }
    let commands: Commands[] = [
        {
            id: 'extension.convertToRfc3339Utc',
            command: context => fr.UnixTimeConverter.convertToRfc3339Utc(context)
        },
        {
            id: 'extension.convertToRfc3339Local',
            command: context => fr.UnixTimeConverter.convertToRfc3339Local(context)
        },
        {
            id: 'extension.convertToUnixTime',
            command: context => fr.UnixTimeConverter.convertToUnixTime(context)
        },
        {
            id: "extension.insertUnixTimeStampNow",
            command: context => fr.UnixTimeConverter.insertUnixTimeStampNow(context)
        },
        {
            id: "extension.insertRfc3339NowUtc",
            command: context => fr.UnixTimeConverter.insertRfc3339NowUtc(context)
        },
        {
            id: "extension.insertRfc3339NowLocal",
            command: context => fr.UnixTimeConverter.insertRfc3339NowLocal(context)
        }
    ];

    commands.forEach(cmd => {
        context.subscriptions.push(vscode.commands.registerCommand(cmd.id, cmd.command));
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}