import * as vscode from "vscode";
import { EventGenerator } from "../base/event-generator";
import { formatText } from "../utils";

export class CommentCode extends EventGenerator {
  selectedCode: string | undefined;
  constructor(action: string, context: vscode.ExtensionContext) {
    super(action, context);
  }

  generatePrompt() {
    const PROMPT = `
        A good code review comment describes the intent behind the code without
        repeating information that's obvious from the code itself. Good comments
        describe "why", explain any "magic" values and non-obvious behaviour.
        Respond based on the programming language of the requested code. Unless stated otherwise.
        Note: Only add function level comments. Do not write comment in between the code.
        Be creative in crafting your comment, but be careful not unnecessary comments.
`;
    return PROMPT;
  }

  createPrompt(selectedCode: string): string {
    const prompt = this.generatePrompt();
    const fullPrompt = `${prompt} \n ${selectedCode}`;
    return fullPrompt;
  }
}
