let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience
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


//TODO event-id(1) is hardcoded, should be dynamic = https://oneweektickets.com/api/bid/1
//TODO redirection to oneweektickets.com/api does not work, needs to be fixed
function enterBid() {
	
	const urlParams = new URLSearchParams(window.location.search);
	
	console.log("prep bid");
	console.log(urlParams.get('amt'));
	console.log($("body").data('auth'));
	const amountAsCent = Math.round(parseFloat(urlParams.get('amt') * 100));
$.ajax({ 
url: 'https://oneweek-tickets.uc.r.appspot.com/api/bid/1',
//'https://oneweektickets.com/api/event/' + urlParams.get('event'),
type: 'post',
beforeSend: function (xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + $("body").data('auth'));
},
contentType: 'application/json',
data: JSON.stringify({"currency":"USD","amount":amountAsCent,"quantity":urlParams.get('qty')}),
success: async function (result) {
//get the sessionId to serve up stripe checkout
	//redirect to stripe checkout page?
	const stripeResponse = await stripe.redirectToCheckout({
	  sessionId: result.sessionId,
	});

	if (stripeResponse.error) {
	  // If `redirectToCheckout` fails due to a browser or network
	  // error, display the localized error message to your customer
		console.log(stripeResponse.error.message);
	}
 },
error: function () { },
});

}