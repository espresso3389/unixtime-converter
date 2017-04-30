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
            id: 'extension.convertToRfc3339',
            command: context => fr.UnixTimeConverter.convertToRfc3339(context)
        },
        {
            id: 'extension.convertToRfc3339Local',
            command: context => fr.UnixTimeConverter.convertToRfc3339Local(context)
        },
        {
            id: 'extension.convertToUnixTime',
            command: context => fr.UnixTimeConverter.convertToUnixTime(context)
        }];

    commands.forEach(cmd => {
        context.subscriptions.push(vscode.commands.registerCommand(cmd.id, cmd.command));
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}