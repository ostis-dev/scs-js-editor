import { editor } from 'monaco-editor';
import { kLangName } from './scs_support';

export class SCsEditor {
  private _container: HTMLElement = null;
  private _editor: editor.IStandaloneCodeEditor = null;

  constructor(container: HTMLElement, value?: string, theme: string = kLangName) {
    this._container = container;
    this._editor = editor.create(this._container, {
      language: kLangName,
      value: value,
      theme: theme
    });
  }
};