# How To Make It Work?
1. Get the binary of CLI with [build workflow](../README.md#build-workflow)
2. Prepare [client schema](#what-is-a-valid-client-schema) (JSON) and
  use its path as `client` parameter
3. Execute the binary with specified parameters
4. Get the generated slide file (HTML)
5. Open it with the browser
6. Navigate to the previous/next page with arrow keys

For example:
1. Type `(p)npm run build` in the terminal
2. Create a file named `client.cs.json` in the current directory
3. Put any valid [client schema](#what-is-a-valid-client-schema)
  in `client.cs.json`
4. Type `(p)npm run start` in the terminal
5. Open the generated slide file `output.cs.html`

# What is a valid `client schema`?
- A Text File in JSON Format
- Has specific fields
- Has type definition used by program
- Below is the definition written in TypeScript:
```ts
type Client = {
  output?: string | null;
  slide?: {
    path: string;
    title?: string | null;
  }[] | null;
};
```
- Default value of properties in the client schema
  - `output`: `./output.cs.html`
  - `slide`: `[]`

- Below are some simple valid examples:
```json
{}
```
```json
{ "output": null, "slide": null }
```
```json
{
  "slide": [
    { "path": "./src/web/code/index.tsx" },
    { "path": "./src/web/code/shared.ts" }
  ]
}
```
```json
{
  "output": "./example/demo/index.html",
  "slide": [
    { "path": "./src/web/code/index.tsx" },
    { "path": "./src/web/code/shared.ts", "title": "The shared module" }
  ]
}
```
