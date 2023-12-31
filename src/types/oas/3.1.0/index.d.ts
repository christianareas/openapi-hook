//
// Type definitions for OpenAPI Specification (OAS) 3.1.0
// Project: https://spec.openapis.org/oas/latest.html
// Definitions by: Christian Areas <https://github.com/christianareas>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
export type Oas_3_1_0_Type = {
	openapi: string
	info: Info
	servers?: Server[]
	paths: Paths
	webhooks?: Map<PathItem> | Map<Reference>
	components?: Components
	security?: SecurityRequirement[]
	tags?: Tag[]
	externalDocs?: ExternalDocs
}

// Helper.
type Map<T> = {
	[key: string]: T
}

// Info Object: https://spec.openapis.org/oas/latest.html#info-object.
type Info = {
	title: string
	summary?: string
	description?: string
	termsOfService?: string
	contact?: Contact
	license?: License
	version: string
}

// Contact Object: https://spec.openapis.org/oas/latest.html#contact-object.
type Contact = {
	name?: string
	url?: string
	email?: string
}

// License Object: https://spec.openapis.org/oas/latest.html#license-object.
type License = {
	name: string
	identifier?: string
	url?: string
}

// Server Object: https://spec.openapis.org/oas/latest.html#server-object.
type Server = {
	url: string
	description?: string
	variables?: Map<ServerVariable>
}

// Server Variable Object: https://spec.openapis.org/oas/latest.html#server-variable-object.
type ServerVariable = {
	enum?: string[]
	default: string
	description?: string
}

// Paths Object: https://spec.openapis.org/oas/latest.html#paths-object.
type Paths = {
	[path: string]: PathItem
}

// Path Item Object: https://spec.openapis.org/oas/latest.html#path-item-object.
type PathItem = {
	$ref?: string
	summary?: string
	description?: string
	get?: Operation
	put?: Operation
	post?: Operation
	delete?: Operation
	options?: Operation
	head?: Operation
	patch?: Operation
	trace?: Operation
	servers?: Server[]
	parameters?: Parameter[] | Reference[]
}

// Operation Object: https://spec.openapis.org/oas/latest.html#operation-object.
type Operation = {
	tags?: string[]
	summary?: string
	description?: string
	externalDocs?: ExternalDocs
	operationId?: string
	parameters?: Parameter[] | Reference[]
	requestBody?: RequestBody | Reference
	responses: Responses
	callbacks?: Map<Callback> | Map<Reference>
	deprecated?: boolean
	security?: SecurityRequirement[]
	servers?: Server[]
}

// Components Object: https://spec.openapis.org/oas/latest.html#components-object.
type Components = {
	schemas?: Map<Schema>
	responses?: Map<Response> | Map<Reference>
	parameters?: Map<Parameter> | Map<Reference>
	examples?: Map<Example> | Map<Reference>
	requestBodies?: Map<RequestBody> | Map<Reference>
	headers?: Map<Header> | Map<Reference>
	securitySchemes?: Map<SecurityScheme> | Map<Reference>
	links?: Map<Link> | Map<Reference>
	callbacks?: Map<Callback> | Map<Reference>
	pathItems?: Map<PathItem> | Map<Reference>
}

// Schema Object: https://spec.openapis.org/oas/latest.html#schema-object.
type Schema = {
	title?: string
	multipleOf?: number
	maximum?: number
	exclusiveMaximum?: boolean
	minimum?: number
	exclusiveMinimum?: boolean
	maxLength?: number
	minLength?: number
	pattern?: string
	maxItems?: number
	minItems?: number
	uniqueItems?: boolean
	maxProperties?: number
	minProperties?: number
	required?: string[]
	enum?: string[] | number[]
	type?: string
	allOf?: (Schema | Reference)[]
	oneOf?: (Schema | Reference)[]
	anyOf?: (Schema | Reference)[]
	not?: Schema | Reference
	items?: Schema | Reference
	properties?: Map<Schema | Reference>
	additionalProperties?: Schema | Reference | boolean
	description?: string
	format?: "int32" | "int64" | "float" | "double" | "string" | "boolean" | "byte" | "binary" | "date" | "date-time" | "password"
	default?: any
	nullable?: boolean
	discriminator?: Discriminator
	readOnly?: boolean
	writeOnly?: boolean
	xml?: Xml
	externalDocs?: ExternalDocs
	example?: any
	deprecated?: boolean
}

// Discriminator Object: https://spec.openapis.org/oas/latest.html#discriminator-object.
type Discriminator = {
	propertyName: string
	mapping?: Map<string>
}

// XML Object: https://spec.openapis.org/oas/latest.html#xml-object.
type Xml = {
	name?: string
	namespace?: string
	prefix?: string
	attribute?: boolean
	wrapped?: boolean
}

// Parameter Object: https://spec.openapis.org/oas/latest.html#parameter-object.
type Parameter = {
	name: string
	in: "query" | "header" | "path" | "cookie"
	description?: string
	required?: boolean
	deprecated?: boolean
	allowEmptyValue?: boolean // Per OAS, NOT RECOMMENDED
	style?: string
	explode?: boolean
	allowReserved?: boolean
	schema?: Schema | Reference
	example?: any
	examples?: Map<Example | Reference>
	content?: Map<MediaType>
}

// Request Body Object: https://spec.openapis.org/oas/latest.html#request-body-object.
type RequestBody = {
	description?: string
	content: Map<MediaType>
	required?: boolean
}

// Header Object: https://spec.openapis.org/oas/latest.html#header-object.
type Header = {
	description?: string
	required?: boolean
	deprecated?: boolean
	allowEmptyValue?: boolean // Per OAS, NOT RECOMMENDED
	style?: string
	explode?: boolean
	allowReserved?: boolean
	schema?: Schema | Reference
	example?: any
	examples?: Map<Example | Reference>
	content?: Map<MediaType>
}

// Media Type Object: https://spec.openapis.org/oas/latest.html#media-type-object.
type MediaType = {
	schema?: Schema
	example?: any
	examples?: Map<Example> | Map<Reference>
	encoding?: Map<Encoding>
}

// Encoding Object: https://spec.openapis.org/oas/latest.html#encoding-object.
type Encoding = {
	contentType?: string
	headers?: Map<Header> | Map<Reference>
	style?: string
	explode?: boolean
	allowReserved?: boolean
}

// Responses Object: https://spec.openapis.org/oas/latest.html#responses-object.
type Responses = {
	default?: Response | Reference
} & {
	[httpStatusCode in HttpStatusCodes]?: Response | Reference
}

// Response Object: https://spec.openapis.org/oas/latest.html#response-object.
type Response = {
	description: string
	headers?: Map<Header> | Map<Reference>
	content?: Map<MediaType>
	links?: Map<Link> | Map<Reference>
}

// HTTP Status Codes: https://spec.openapis.org/oas/latest.html#http-status-codes.
// IANA Status Code Registry: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml.
type HttpStatusCodes =
	// Informational.
	| "100" | "101" | "102" | "103"
	// Successful.
	| "200" | "201" | "202" | "203" | "204" | "205" | "206" | "207" | "208"
	| "226"
	// Redirection.
	| "300" | "301" | "302" | "303" | "304" | "305" | "306" | "307" | "308"
	// Client Error.
	| "400" | "401" | "402" | "403" | "404" | "405" | "406" | "407" | "408" | "409"
	| "410" | "411" | "412" | "413" | "414" | "415" | "416" | "417"
	| "421" | "422" | "423" | "424" | "425" | "426" | "428" | "429"
	| "431"
	| "451"
	// Server Error.
	| "500" | "501" | "502" | "503" | "504" | "505" | "506" | "507" | "508"
	| "511"

// Security Requirement Object: https://spec.openapis.org/oas/latest.html#security-requirement-object.
type SecurityRequirement = {
	[name: string]: string[]
}

// Security Scheme Object: https://spec.openapis.org/oas/latest.html#security-scheme-object.
type SecurityScheme = {
	type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect"
	description?: string
	name?: string // apiKey
	in?: "query" | "header" | "cookie" // apiKey
	scheme?: string // http
	bearerFormat?: string // http
	flows?: OAuthFlows // oauth2
	openIdConnectUrl?: string // openIdConnect
}

// OAuth Flows Object: https://spec.openapis.org/oas/latest.html#oauth-flows-object.
type OAuthFlows = {
	implicit?: OAuthFlow
	password?: OAuthFlow
	clientCredentials?: OAuthFlow
	authorizationCode?: OAuthFlow
}

// OAuth Flow Object: https://spec.openapis.org/oas/latest.html#oauth-flow-object.
type OAuthFlow = {
	authorizationUrl: string
	tokenUrl: string
	refreshUrl?: string
	scopes: Map<string>
}

// Link Object: https://spec.openapis.org/oas/latest.html#link-object.
type Link = {
	operationRef?: string
	operationId?: string
	parameters?: Map<any>
	requestBody?: any
	description?: string
	server?: Server
}

// Callback Object: https://spec.openapis.org/oas/latest.html#callback-object.
type Callback = {
	[expression: string]: PathItem | Reference
}

// Example Object: https://spec.openapis.org/oas/latest.html#example-object.
type Example = {
	summary?: string
	description?: string
	value?: any
	externalValue?: string
}

// Reference Object: https://spec.openapis.org/oas/latest.html#reference-object.
type Reference = {
	$ref: string
	summary?: string
	description?: string
}

// Tag Object: https://spec.openapis.org/oas/latest.html#tag-object.
type Tag = {
	name: string
	description?: string
	externalDocs?: ExternalDocs
}

// External Documentation Object: https://spec.openapis.org/oas/latest.html#external-documentation-object.
type ExternalDocs = {
	description?: string
	url: string
}
