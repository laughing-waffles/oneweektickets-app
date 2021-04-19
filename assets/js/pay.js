let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};
window.onload = async () => {
  await configureClient();
  const isAuthenticated = await auth0.isAuthenticated();
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
	   		const isCallback = await auth0.handleRedirectCallback();
	  		await updateUI();
		}
	
}


const updateUI = async () => { 
    console.log("authenticated!");
	$('body').data("auth", await auth0.getTokenSilently());
	enterBid();
};


//TODO get the token from auth0, and grab url vars for bid amt and qty. 
/**
curl -X POST https://api-dot-oneweek-tickets.uc.r.appspot.com/api/bid/1  \ 
    --header "authorization: Bearer {USER_TOKEN_HERE}" \
    --header "Content-Type: application/json"  \
    -d '{"currency":"USD","amount":11100,"quantity":2}'

*/



function enterBid() {
	const urlParams = new URLSearchParams(window.location.search);
	
	console.log("prep bid");
	console.log(urlParams.get('amt'));
	console.log($("body").data('auth'));
$.ajax({
url: 'https://oneweektickets.com/api/event/1',
//'https://oneweektickets.com/api/event/' + urlParams.get('event'),
type: 'POST',
beforeSend: function (xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + $("body").data('auth'));
},
data: {"currency":"USD","amount":urlParams.get('amt'),"quantity":urlParams.get('qty')},
success: function (result) {
//get the sessionId to serve up stripe checkout
	//redirect to stripe checkout page?
	const result = await stripe.redirectToCheckout({
	  sessionId: result.sessionId,
	});

	if (result.error) {
	  // If `redirectToCheckout` fails due to a browser or network
	  // error, display the localized error message to your customer
		console.log(result.error.message);
	}
 },
error: function () { },
});
}