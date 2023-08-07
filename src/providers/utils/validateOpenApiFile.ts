// Dependencies.
import { load } from "js-yaml"

// Validate the OpenAPI file.
export default function validateOpenApiFile(
	urlToOpenApiFile: string,
	openApiFile: string
): any {
	// Get the file extension.
	const fileExtension = urlToOpenApiFile.split('.').pop()?.toLowerCase()

	// Declare the unvalidated OpenAPI data.
	let unvalidatedOpenApiData: any

	// Validate the file extension.
	if (fileExtension === 'yaml' || fileExtension === 'yml') {
		try {
			unvalidatedOpenApiData = load(openApiFile)
		} catch (error) {
			throw new Error(
				`Error parsing your YAML file: ${(error as Error).message}. Verify your YAML syntax and try again.`
			)
		}
	} else if (fileExtension === 'json') {
		try {
			unvalidatedOpenApiData = JSON.parse(openApiFile)
		} catch (error) {
			throw new Error(
				`Error parsing your JSON file: ${(error as Error).message}. Verify your JSON syntax and try again.`
			)
		} 
	} else {
		throw new Error(
			`Error with your file type: ${fileExtension}. openapi-components only supports YAML and JSON files. Update your OpenAPI specification and try again.`
		)
	}

	// Validate the OpenAPI version.
	const oasVersion = unvalidatedOpenApiData.openapi
	const validOasVersion = "3.1"
	const semiValidOasVersion = "3.0"
	const invalidOasVersion = "2"
	const officialSupportMessage = `openapi-components officially supports OAS ${validOasVersion}.x or greater.`
	const oasVersionMessage = `Your OAS version is ${oasVersion}.`

	if (!oasVersion) {
		throw new Error(
			`${officialSupportMessage} Your openapi field is missing. Update your OpenAPI specification and try again.`
		)
	} else if (oasVersion.startsWith(invalidOasVersion)) {
		throw new Error(
			`${officialSupportMessage} ${oasVersionMessage} Unfortunately, openapi-components doesn’t support OAS 2.x. Consider updating your OpenAPI specification and try again.`
		)
	} else if (oasVersion.startsWith(semiValidOasVersion)) {
		console.warn(
			`${officialSupportMessage} ${oasVersionMessage} You may experience issues. Consider updating your OpenAPI specification.`
		)
	} else if (!oasVersion.startsWith(validOasVersion)) {
		throw new Error(
			`${officialSupportMessage} ${oasVersionMessage} Update your OpenAPI specification and try again.`
		)
	}

	return unvalidatedOpenApiData
}
