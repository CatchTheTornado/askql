export interface AskNode<Key extends keyof any> {
  type: Key;
  children?: AskNodeOrValue<Key>[];

  /** local scope of values */
  scope?: Record<string, any>;

  /** vm uses this for resolving scope*/
  parent?: AskNode<Key>;
}

export type AskValue = null | string | number | boolean;

export type AskNodeOrValue<Key extends keyof any> = AskNode<Key> | AskValue;

export type AskCode<Key extends keyof any> = AskNodeOrValue<Key>;
