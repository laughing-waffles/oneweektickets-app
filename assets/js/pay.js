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
  
   await auth0.handleRedirectCallback();
  await updateUI();
}
}

const updateUI = async () => { 
    console.log(await auth0.getTokenSilently());
};


//TODO get the token from auth0, and grab url vars for bid amt and qty. 
/**
curl -X POST https://api-dot-oneweek-tickets.uc.r.appspot.com/api/bid/1  \ 
    --header "authorization: Bearer {USER_TOKEN_HERE}" \
    --header "Content-Type: application/json"  \
    -d '{"currency":"USD","amount":11100,"quantity":2}'

*/

const urlParams = new URLSearchParams(queryString);

function enterBid() {
$.ajax({
url: 'https://api-dot-oneweek-tickets.uc.r.appspot.com/api/bid/1',
type: 'POST',
beforeSend: function (xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + auth0pass);
},
data: {"currency":"USD","amount":urlParams.get('amt'),"quantity":urlParams.get('qty')},
success: function () {
//get the sessionId to serve up stripe checkout
	//redirect to stripe checkout page?

 },
error: function () { },
});
}