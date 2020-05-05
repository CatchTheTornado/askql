export interface AskNode<Key extends keyof any> {
  type: Key;
  children?: AskNodeOrValue<Key>[];

  /** local scope of values */
  scope?: Record<string, any>;

  /** vm uses this for resolving scope*/
  parent?: AskNode<Key>;
}

export type AskNodeOrValue<Key extends keyof any> = AskNode<Key> | string;

export type AskCode<Key extends keyof any> = AskNodeOrValue<Key>;
