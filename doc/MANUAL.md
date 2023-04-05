# How To Make It Work?
1. Get the binary of CLI with [build workflow](../README.md#build)
2. Prepare [input schema](#what-is-a-valid-input-schema) (JSON) and
  use its path as `input` parameter
3. Execute the binary with specified parameters
4. Get the generated slide file (HTML)
5. Open it with the browser
6. Navigate to the previous/next page with arrow keys

For example:
1. Type `npm run build` in the terminal
2. Create a file named `input.codeslide.json` in the current directory
3. Put any valid [input schema](#what-is-a-valid-input-schema)
  in `input.codeslide.json`
4. Type `npm run start` in the terminal
5. Open the generated slide file `output.codeslide.html`

# What is a valid `input schema`?
- A Text File in JSON Format
- Has specific fields
- Has type definition used by program
- Below is the definition written in TypeScript:
  ```ts
  type Input = {
    output?: string | null,
    slide?: {
      [path: string]: {
        [P in keyof SlideItem]: SlideItem[P];
      };
    } | null,
  };
  ```
- Default value of properties in the input schema
  - `output`: `./output.codeslide.html`
  - `slide`: `{}`

- Below are some simple valid examples:
```json
{}
```
```json
{ "output": null, "slide": null }
```
```json
{
  "slide": {
    "./src/web/code/index.tsx": {
      "right": "./src/web/code/shared.ts"
    }
  }
}
```
```json
{
  "output": "./output.html",
  "slide": {
    "./src/web/code/index.tsx": {
      "right": "./src/web/code/shared.ts"
    }
  }
}
```
