// Dependencies.
import React, { FunctionComponent, ReactNode } from "react"

// Error boundary type definitions.
type OpenApiDataProviderErrorBoundaryProps = {
	children: ReactNode
	error: Error | null
}

// Error boundary.
const OpenApiDataProviderErrorBoundary: FunctionComponent<
	OpenApiDataProviderErrorBoundaryProps
> = ({
	children,
	error,
}) => {
	if (error) {
		return (
			<div>
				<strong>OpenApiDataProvider Error</strong>
				<p>{error?.message}</p>
			</div>
		)
	}

	return (
		<>
			{children}
		</>
	)
}

export default OpenApiDataProviderErrorBoundary