import { editor } from 'monaco-editor';
import { kLangName } from './scs_support';

export class SCsEditor {
  private _container: HTMLElement = null;
  private _editor: editor.IStandaloneCodeEditor = null;

  constructor(container: HTMLElement, value?: string, theme: string = kLangName) {
    this._container = container;
    this._editor = editor.create(this._container, {
      language: kLangName,
      theme: theme
    });

    if (value)
      this.content = value;
  }

  public get content() : string {
    return this._editor.getValue();
  }

  public set content(newValue: string) {
    this._editor.setValue(newValue);
  }
};