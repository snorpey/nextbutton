export function load ( url ) {
	return fetch( url );
}

export function loadJSON ( url ) {
	return fetch( url )
		.then ( data => data.json() );
}