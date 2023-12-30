import {
  CompletionItemFormat,
  CompletionItemKind,
} from "@/capabilities/completion";
import { MethodHandler } from "@/server/server";

const completionItems = [
  {
    label: "var",
    value: "var ${1:name} = $2",
    detail: "Declare variable snippet",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.Snippet,
  },
  {
    label: "func",
    value: "func ${1:name}() {\n  ${2}\n}",
    detail: "Function snippet",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.Snippet,
  },
  {
    label: "fundes",
    value:
      'func ${1:name}()\ndesc "${2:Quick function description}" {\n  $3\n}',
    detail: "Function with description snippet",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.Snippet,
  },
  {
    label: "if",
    value: "if $1 {\n  $2\n}",
    detail: "If statement snippet",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.Snippet,
  },
  {
    label: "not",
    value: "not",
    detail: "Not statement keyword",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.PlainText,
  },
  {
    label: "true",
    value: "true",
    detail: "",
    kind: CompletionItemKind.Value,
    format: CompletionItemFormat.PlainText,
  },
  {
    label: "false",
    value: "false",
    detail: "",
    kind: CompletionItemKind.Value,
    format: CompletionItemFormat.PlainText,
  },
  {
    label: "greater",
    value: "greater",
    detail: "Greater statement keyword",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.PlainText,
  },
  {
    label: "less",
    value: "less",
    detail: "Less statement keyword",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.PlainText,
  },
  {
    label: "different",
    value: "different",
    detail: "Different statement keyword",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.PlainText,
  },
  {
    label: "or",
    value: "or",
    detail: "Or statement keyword",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.PlainText,
  },
  {
    label: "return",
    value: "return $1",
    detail: "Return statement keyword",
    kind: CompletionItemKind.Keyword,
    format: CompletionItemFormat.Snippet,
  },
];

const handler: MethodHandler = async (request) => {
  console.log(request);

  return {
    jsonrpc: "2.0",
    id: request.id,
    result: {
      items: completionItems.map((item) => ({
        label: item.label,
        insertText: item.value,
        insertTextFormat: item.format,
        detail: item.detail,
        kind: item.kind,
      })),
    },
  };
};

export default handler;
