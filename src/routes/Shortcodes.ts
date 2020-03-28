import { Document, Model, model, Types, Schema, Query } from "mongoose"

interface IShortcode extends Document {
  context: string;
  code?: string;
  createdAt?: Date;
}

const schema = new Schema({
  context: {
    type: String,
    required: true
  },
  code: {
    type: String,
    index: true,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

export const Shortcode = model<IShortcode>('shortcode', schema, 'shortcodes', true);

export class ShortcodeModel {

  private _shortcodeModel: Partial<IShortcode>;
  private _count = 0;
  private _codeLen = 6;

  constructor(shortcodeModel: Partial<IShortcode>) {
    const context = shortcodeModel.context || '';
    shortcodeModel.code = this.createCode(context);
    shortcodeModel.createdAt = new Date();
    this._shortcodeModel = shortcodeModel;
  }

  get model(): Partial<IShortcode> {

    return this._shortcodeModel;
  }

  get code(): string {

    return this._shortcodeModel.code || '';
  }

  set code(_code: string) {

    this._shortcodeModel.code = _code;
  }

  get codeLen(): number {
    return this._codeLen;
  }

  set codeLen(codeLen: number) {
    this._codeLen = codeLen;
  }

  get count(): number {
    return this._count;
  }

  set count(count: number) {
    this._count = count;
  }

  createCode(context: string, codeLen = this._codeLen): string {
    const seed = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let i = 0;
    let code = `${context}:`;

    while (i < codeLen) {
      let random = Math.floor(Math.random() * seed.length);
      code+= seed[random];
      i++;
    }
    return code;
  }
}