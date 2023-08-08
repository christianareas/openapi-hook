# OpenAPI Hook
`openapi-hook` is a (soon-to-be published) NPM module that takes your OpenAPI specification and returns a React hook. Use it to build your custom API documentation — styled to your exact specifications.

This package officially supports OAS (OpenAPI Specification) 3.1.x. You may be able be able to use it with OAS 3.0.x files, but will likely run into issues. If you’d like to use this package, consider upgrading your OpenAPI specification to OAS 3.1.x.

In addition, this package does not support references (`$ref`). This feature is on the roadmap. In the meantime, use [`json-ref-resolver`](https://github.com/stoplightio/json-ref-resolver) or [`swagger-cli`](https://github.com/APIDevTools/swagger-cli) to resolve your references.

![GNU GPLv3 License Badge](https://img.shields.io/github/license/christianareas/openapi-hook)

## Table of Contents
- [Install](#install)
- [Get Started](#get-started)
- [Uninstall](#uninstall)
- [Roadmap](#roadmap)
- [License](#license)

## Install
If you’d like to try `openapi-hook` before it’s published, clone the repo:

```bash
gh repo clone christianareas/openapi-hook
```

Change to the `openapi-hook` directory, install, and build:

```bash
cd openapi-hook
npm i
npm run build
```

Link `openapi-hook` to your local system:

```bash
npm link
```

Change to your project’s directory and link it to `openapi-hook`:

```bash
cd path/to/your-project
npm link openapi-hook
```


## Get Started

### Set Up the OpenAPI Data Provider
The OpenAPI data provider gives the OpenAPI data hook access to the data from your OpenAPI specification. You **must** set this up before you can use the hook.

To set it up, import `OpenApiDataProvider`, use it to wrap your app or the API docs portion of your app, and pass it the URL to your OpenAPI file:

```tsx
import { OpenApiDataProvider } from "openapi-hook"
import OpenApiDoc from "./components/OpenApiDoc"

...

export default function DocsApiPage() {
	const urlToOpenApiFile = "https://raw.githubusercontent.com/christianareas/resume/main/docs/spec/_versions/resume-api-0.1.1.yaml"

	return (
		<OpenApiDataProvider
			urlToOpenApiFile={urlToOpenApiFile}
		>
			<OpenApiDoc />
		</OpenApiDataProvider>
	)
}
```

### Use the OpenAPI Data Hook
The OpenAPI data hook gives you direct access to the data from your OpenAPI specification. The hook gives you full control of the elements of your OpenAPI specification.

To get started, import `useOpenApiData`, use it to save your OpenAPI data, and start building your API documentation. All the OpenAPI objects and fields you passed to `OpenApiDataProvider` are available through the hook. For example:

```tsx
import { useOpenApiData } from "openapi-hook"

...

export default function OpenApiDoc() {
	const openApiData = useOpenApiData()

	return (
		<div>
			<h1>
				{openApiData.info.title} (<span>{openApiData.info.version}</span>)
			</h1>
			
			...
			
		</div>
	)
}
```

#### TypeScript
If you’d like to type your OpenAPI data, import `Oas_3_1_0_Type` and use it to type `openApiData`:

```tsx
import { useOpenApiData, Oas_3_1_0_Type } from "openapi-hook"

...

export default function OpenApiDoc() {
	const openApiData: Oas_3_1_0_Type = useOpenApiData()

...
```


## Uninstall
Change to your project’s directory and unlink it from `openapi-hook`:

```bash
cd path/to/your-project
npm unlink openapi-hook
```

Change to the `openapi-hook` directory and unlink `openapi-hook` from your local system:

```bash
cd path/to/openapi-hook
npm unlink -g
```


## Roadmap

### Beta
- ~~Add OpenAPI type definition (based on OAS 3.1).~~
- ~~Add basic error handling.~~
- ~~Add OpenAPI hook.~~
- Add a docs site (Docusaurus) and publish it to GitHub Pages.
- Add reference (`$ref`) support.

### Future
- Add basic caching.
- Add OAS 3.0 support.
- Add component library (separate NPM module).


## License
See [LICENSE (GNU GPLv3)](./LICENSE).