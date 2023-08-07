// Dependencies.
import validateOpenApiFile from "./validateOpenApiFile"
import { Oas_3_1_0_Type } from "../.."

// Fetch, validate, and type the OpenAPI data.
export async function fetchAndPrepareOpenApiData(
	urlToOpenApiFile: string
): Promise<Oas_3_1_0_Type> {
	try {
		// Fetch the OpenAPI file.
		const fetchResponse = await fetch(urlToOpenApiFile)

		// If the response is not OK, throw an error.
		if (!fetchResponse.ok) {
			throw new Error(
				`Couldn’t fetch your OpenAPI specification. Verify the file is at ${urlToOpenApiFile} and try again. Status: ${fetchResponse.status} ${fetchResponse.statusText}.`
			)
		}

		// Save the OpenAPI file.
		const openApiFile = await fetchResponse.text()
		
		// Validate the OpenAPI file’s format and save the data as an object.
		const unvalidatedOpenApiData = validateOpenApiFile(
			urlToOpenApiFile,
			openApiFile,
		)
		
		// Type the OpenAPI data.
		const openApiData: Oas_3_1_0_Type = unvalidatedOpenApiData
		
		// Return the OpenAPI data.
		return openApiData
	} catch (error) {
		if (error instanceof TypeError) {
			console.error(error)
			throw new Error(
				`There’s an issue with the network. Verify the URL and try again. If the issue persists, try again later. Error: ${error.message}.`
			)
		} else {
			console.error(error)
		}
		throw error
	}
}
