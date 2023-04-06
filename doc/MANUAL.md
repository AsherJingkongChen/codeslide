# How To Make It Work?
## 1. Prepare the environment and build the application
1. Prepare the command line environment (like `Terminal.app` in MacOS)
   because this is a CLI App (CLI is for Command Line Interface)
2. Install package managers and their environments:
   - `Node.js` and (`NPM` or `PNPM`)
   - `Rust` and `Cargo`
3. Install `node_modules`, dependencies for Web App
   - Type `npm i` on the command line to install
4. Build both Web and CLI Apps with `npm run build`
   - If using `pnpm`, just type `pnpm build`
5. Obtain the binary at `./target/release/codeslide-cli`

## 2. Execute the command with Client Schema
1. Get the `Client Schema` ready
   - [Click here for the definition of `Client Schema` (JSON)](#what-is-the-client-schema)
2. To run the CLI App,
   Make use of file descriptors specified like `stdout, stdin, stderr`.
   - For example the current directory is at `codeslide-cli` (the project root)
     , the Client Schema file is at `./client.cs.json`,
     and the target file path is `./output.cs.html`.
     Type `./target/release/codeslide-cli < ./client.cs.json > ./output.cs.html` on the command line
   - This approach is for development temporarily

## 3. Use the slide file
1. Open the generated slide file (HTML) with the browser
2. Navigate through pages using arrow keys and whitespace.

## In a nutshell
**Build and obtain the binary to process a valid CodeSlide Client Schema then generate a slide file**

## NOTE
- After web app built, the bundle size analysis is at `doc/web/stats.html`

# What is the `Client Schema`?
- Specifies the configuration for the slide presentation in JSON format
- Has type definitions in the source code
- Below is the definition written in TypeScript:
```ts
type ClientSchema = {
  slide?: Array<
    {
      path: string;
      title?: string | null;
    }
    | string // equivalent to path
  >
  | null;
};
```
- Default values
  - `ClientSchema.slide`: `[]`
- Below are some simple valid examples:
```json
{}
```
```json
{ "slide": null }
```
```json
{ "slide": [] }
```
```json
{
  "slide": [
    "./src/web/code/index.tsx",
    { "path": "./src/web/code/shared.ts" }
  ]
}
```
```json
{
  "slide": [
    { "path": "./src/web/code/index.tsx" },
    {
      "path": "./src/web/code/shared.ts",
      "title": "The shared module"
    }
  ]
}
```

# Development Workflow
- Use `npm run build` to build
- For Web App, launch `webpack-dev-server` with the command: `npm run dev:web`
- For CLI App, build Web App first and then type `npm run dev:cli`
  on the command line, it calls `Cargo` to compile and run in debug mode
- `branch v0` is the git branch for development
- To clean generated files:
   - For All: `npm run clean`
   - For Web App with the command: `npm run clean:web`
   - For CLI App with the command: `npm run clean:cli`
