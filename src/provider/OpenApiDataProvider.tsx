// Dependencies.
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { Oas_3_1_0_Type } from ".."
import { fetchAndPrepareOpenApiData } from "./utils/fetchAndPrepareOpenApiData"
import OpenApiDataProviderErrorBoundary from "./OpenApiDataProviderErrorBoundary"

// Context.
const OpenApiContext = createContext<Oas_3_1_0_Type | null>(null)

// Hook.
export function useOpenApiData(): Oas_3_1_0_Type | null {
	// Get context.
	const context = useContext(OpenApiContext)
	// If there’s no context, throw an error.
	if (context === null ) {
		throw new Error(
			"Couldn’t return the OpenAPI data. Verify you correctly set up the OpenApiDataProvider and try again."
		)
	}
	return context
}

// Provider type definitions.
type OpenApiDataProviderProps = {
	urlToOpenApiFile: string
	children: ReactNode
}

// Provider.
export function OpenApiDataProvider({
	urlToOpenApiFile,
	children,
}: OpenApiDataProviderProps) {
	// Initialize states.
	const [openApiData, setOpenApiData] = useState<Oas_3_1_0_Type | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	// Fetch and save the OpenAPI data, and set the states.
	useEffect(() => {
		async function saveOpenApiData() {
			try {
				const openApiData = await fetchAndPrepareOpenApiData(urlToOpenApiFile)
				setError(null)
				setLoading(false)
				setOpenApiData(openApiData)
			} catch (error) {
				console.error(error)
				if (error instanceof Error) {
					setError(error)
					setLoading(false)
				}
			}
		}
		saveOpenApiData()
	}, [urlToOpenApiFile])
	
	// Return the provider.
	return (
		<OpenApiContext.Provider
			value={openApiData}
		>
			<OpenApiDataProviderErrorBoundary
				error={error}	
			>
				{loading ? <p>Loading…</p> : children}
			</OpenApiDataProviderErrorBoundary>
		</OpenApiContext.Provider>
	)
}
