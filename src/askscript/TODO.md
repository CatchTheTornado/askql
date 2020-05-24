# Assorted to dos

## Operators cannot have any hardcoded priority

```
2 + (3 * 4)
```

otherwise this is just confusing...

## change AskJSON format to shorter

```json
{
  "name": "ask",
  "props": {
    "args": [
      ["maxAge", "int"],
      ["userName", "string"]
    ]
  },
  "children": []
}
```

could become just

```json
// [string, props, ...children]
[
  "ask",
  {
    // props as a second item
    "args": [
      ["maxAge", "int"],
      ["userName", "string"]
    ]
  }
  // ...children
]
```
