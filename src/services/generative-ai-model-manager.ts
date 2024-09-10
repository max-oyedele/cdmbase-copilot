import * as vscode from "vscode";
import { getConfigValue } from "../utils";
import { ChatManager } from "./chat-manager";

export const setUpGenerativeAiModel = (
  context: vscode.ExtensionContext,
  model: string,
  key: string,
  webViewProviderClass: any,
  subscriptions: vscode.Disposable[],
  quickFixCodeAction: vscode.Disposable
) => {
  try {
    
    const webViewProvider = new webViewProviderClass(
      context.extensionUri,
      key,
      model,
      context
    );

    const registerWebViewProvider: vscode.Disposable =
      vscode.window.registerWebviewViewProvider(
        webViewProviderClass.viewId,
        webViewProvider
      );

    const chatManager = new ChatManager(context);
    const chatWithCDMBaseCopilot = chatManager.registerChatCommand();

    context.subscriptions.push(
      ...subscriptions,
      quickFixCodeAction,
      registerWebViewProvider,
      chatWithCDMBaseCopilot
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      "An Error occured while registering event subscriptions"
    );
    console.log(error);
  }
};
