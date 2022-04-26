const dolbyio = {};

/**
 * 
 * @param {*} 
 * @returns token (string)
 */
dolbyio.tokenPrompt = () => {
	document.getElementById('btn-token').onclick = async () => {
		modal.hide();

		let token = document.getElementById('input-token').value;
		let params = new URLSearchParams(window.location.search);
		params.set("token", token);
		window.location.search = params.toString();

		return token;
	};

	const modalElement = document.getElementById('token-prompt');
	const modal = new bootstrap.Modal(modalElement, {
		backdrop: 'static',
		keyboard: false,
		focus: true
	});
	modal.show();
}

/**
 * 
 * @param {*} 
 * @returns token (string)
 * 
 * This function will help provide a token that is given to the application
 * as a querystring parameter.
 */
dolbyio.getAccessToken = () => {
	const queryParams = new URLSearchParams(window.location.search);

	console.group('Dolby.io Client Access Token');
	const accessToken = queryParams.get('token');

	if (!accessToken) {
		let inputToken = dolbyio.tokenPrompt();
		console.log(inputToken);
	}

	const token = accessToken.split('.')[1];
	const jwt = JSON.parse(window.atob(token));
	const expiration = new Date(jwt.exp * 1000);

	console.log(`Token: ${accessToken}`);
	console.log(`Expires: ${expiration}`);
	if (expiration.getTime() <= new Date().getTime()) { 
		console.log("This token has expired.  Fetch a new one from the Dolby.io dashboard.");
	}
	console.groupEnd();

	return accessToken;
};

