import { CancellationToken, editor, languages, Position } from 'monaco-editor';

export const kLangName: string = 'scs';

const kKeywords: string[] = [
  'sc_const', 'sc_var',
  /* nodes */
  'sc_node', 'sc_link', 'sc_edge_dcommon', 'sc_edge_ucommon', 'sc_edge_main', 'sc_edge_access',
  'sc_node_tuple', 'sc_node_struct', 'sc_node_role_relation', 'sc_node_norole_relation',
  'sc_node_class', 'sc_node_abstract', 'sc_node_material',
  /* edges */
  'sc_edge_pos', 'sc_edge_neg', 'sc_edge_fuz', 'sc_edge_perm', 'sc_edge_temp',
  /* backward compatibility */
  'sc_node_not_relation', 'sc_node_not_binary_tuple'];

const kConnectors: string[] = ['>', '<', '->', '<-', '<>', '..>', '<..', '<=>', '_<=>', '=>', '<=',
  '_=>', '_<=', '_->', '_<-', '-|>', '<|-', '_-|>', '_<|-', '-/>', '</-',
  '_-/>', '_</-', '~>', '<~', '_~>', '_<~', '~|>', '<|~', '_~|>', '_<|~',
  '~/>', '</~', '_~/>', '_</~'];

export function SCsInitGlobal() {
  languages.register({id: kLangName});

  languages.registerCompletionItemProvider(kLangName, getCompletionProvider());
  languages.setLanguageConfiguration(kLangName, conf);
  languages.setMonarchTokensProvider(kLangName, language);
  editor.defineTheme(kLangName, scsTheme);
}

function getCompletionProvider() : languages.CompletionItemProvider {

  return {
    provideCompletionItems: function(model: editor.ITextModel, 
                                     position: Position,
                                     context: languages.CompletionContext,
                                     token: CancellationToken) : languages.ProviderResult<languages.CompletionList> {
      const result: languages.CompletionItem[] = [];


      kKeywords.forEach((key: string) => {
        result.push({ 
          label: key, 
          kind: languages.CompletionItemKind.Keyword, 
          insertText: key,
          range: null
        });
      });

      kConnectors.forEach((key: string) => {
        result.push({ 
          label: key, 
          kind: languages.CompletionItemKind.Reference,
          insertText: key,
          range: null
        });
      });

      return { suggestions: result };
    }
  };
}

const scsTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  colors: {
    "editor.background": "#f8f8f8",
    "editorCursor.foreground": "#000000",
    "editor.foreground": "#353535",
    "editor.lineHighlightBackground": "#f8f8f8",
    "editor.selectionBackground": "#abdffa",
    "activityBar.background": "#c3c7cd",
    "activityBar.foreground": "#000000",
    "statusBar.background": "#a4a9b2",
    "statusBar.foreground": "#000000",
    "statusBar.noFolderBackground": "#a4a9b2",
    "statusBarItem.hoverBackground": "#cccccc",
    "editorLineNumber.foreground": "#bbbbbb",
    "sideBar.background": "#ebedef",
    "titleBar.activeBackground": "#dfe4e7",
    "titleBar.activeForeground": "#000000",
    "list.hoverBackground": "#dbdde0",
    "list.inactiveSelectionBackground": "#c7cbd1",
    "editorIndentGuide.background": "#eaeaea"
  },
  rules: [
    { token: 'delimiter', foreground: '535353', fontStyle: 'italic' },
    { token: 'delimiter.curly', foreground: '535353', fontStyle: 'italic' },
    { token: 'delimiter.square', foreground: '535353', fontStyle: 'italic' },
    { token: 'delimiter.parenthesis', foreground: '535353', fontStyle: 'italic' },
    { token: 'content.internal', foreground: 'e88501', fontStyle: 'italic' },
    { token: 'content.internal.escape', foreground: 'e88501' },
    { token: 'alias', foreground: 'e88501', fontStyle: 'bold' },
    { token: 'keyword', foreground: '386ac3' },
    { token: 'identifier', foreground: 'e06c75' },
    { token: 'comment', foreground: '10a567'},
    { token: 'string', foreground: 'e88501' },
    { token: 'operators', foreground: '535353'},
    { token: 'punctuation', foreground: '535353'},
  ]
};

const conf: languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
  ],
  autoClosingPairs: [
    { open: '[', close: ']' },
    { open: '{', close: '}' },
    { open: '(', close: ')' },
    { open: '\'', close: '\'', notIn: ['string', 'comment'] },
    { open: '"', close: '"', notIn: ['string'] },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: '\'', close: '\'' },
  ]
};

const language = <languages.IMonarchLanguage> {
  tokenPostfix: '.scs',
  defaultToken: '',
  brackets: [
    { open: '{', close: '}', token: 'delimiter.curly' },
    { open: '[', close: ']', token: 'delimiter.square' },
    { open: '(', close: ')', token: 'delimiter.parenthesis' },
  ],
  keywords: kKeywords,

  tokenizer: {

    root: [ { include: '@selector'} ],
    
    selector: [
      { include: '@whitespace' },
      { include: '@contours' },
      { include: '@contents' },
      { include: '@strings' },
      { include: '@brackets' },

      // connectors
      { include: '@connectors'},

      // identifiers and keywords
      {
        regex: /[a-zA-Z_0-9]\w*/, action: {
          cases: {
            '@keywords': { token: 'keyword' },
            '@default': { token: 'identifier' }
          }
        }
      },
      { regex: /@([a-zA-Z0-9_]+)/, action: { token: 'alias' } },
      { regex: /([_]?[.]{0,2})?([a-zA-Z0-9_]+)/, action: { token: 'identifier' } },
    ],

    brackets: [
      { regex: /[(\[][*]/, action: { token: 'delimiter' } },
      { regex: /[*][)\]]/, action: { token: 'delimiter' } },
      { regex: /[{}()\[\]]/, action: { token: '@brackets'} }
    ],

    connectors: [
      { regex: /\s*[_]?([-~][\/|]?)>\s*/, action: { token: 'operators' } },
      { regex: /\s*[_]?<([\/|]?[-~])\s*/, action: { token: 'operators' } },
      { regex: /\s*[_]?((=>)|(<=))\s*/, action: { token: 'operators' } },
      { regex: /\s*([_]?<=>)|([.]{0,2}>|<[.]{0,2})\s*/, action: { token: 'operators'} }
    ],

    contours: [
      { regex: /~?(\[[*])/, action: { token: 'delimiter', next: '@contour' } },
    ],

    contour: [
      { regex: /[*]\]/, action: { token: 'delimiter', next: '@pop' } },
      { regex: /(?!([*][\]]))/, action: { token: 'contour.internal', next: '@root'} }
    ],

    contents: [
      { regex: /~?\[/, action: { token: 'delimiter', next: '@content' }}
    ],

    content: [
      { regex: '\\\\.', action: { token: 'content.internal' } },
      { regex: ']', action: { token: 'delimiter', next: '@pop' } },
      { regex: /[^\[\]]+/, action: {token: 'content.internal.escape' } },
      { regex: '.', action: { token: 'content.internal' } }
    ],

    strings: [
      { regex: '~?"', action: { token: 'string', next: '@stringenddoublequote' } },
    ],

    stringenddoublequote: [
      { regex: '\\\\.', action: { token: 'string'} },
      { regex: '"', action: { token: 'string', next: '@pop' } },
      { regex: /[^\\"]+/, action: { token: 'string'} },
      { regex: '.', action: { token: 'string' } }
    ],

    comment: [
      { regex: /[^\/*]+/, action: { token: 'comment'} },
      { regex: /\*\//, action: { token: 'comment', next: '@pop'} },
      { regex: /[\/*]/, action: { token: 'comment' } }
    ],

    doccomment: [
      { regex: /[^\/*]+/, action: { token: 'comment.doc' } },
      { regex: /\*\//, action: { token: 'comment.doc', next: '@pop' } },
      { regex: /[\/*]/, action: { token: 'comment.doc' } }
    ],

    whitespace: [
      { regex: /[ \t\r\n]+/, action: { token: '' } },
      { regex: /\/\*\*(?!\/)/, action: { token: 'comment.doc', next: '@doccomment'} },
      { regex: /\/\*/, action: { token: 'comment', next: '@comment'} },
      { regex: /\/\/.*$/, action: { token: 'comment'} },
    ],
  }
};