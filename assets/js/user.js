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
	$("#messageload").text("Logging you in...");
  await configureClient();
  const isAuthenticated = await auth0.isAuthenticated();
  if (isAuthenticated) {
   console.log(JSON.stringify(
     await auth0.getUser()
    ));
	$('body').data("auth", await auth0.getTokenSilently());
      var userInfo = await auth0.getUser()
	
	$('#img-uploaded').attr('src',userInfo.picture);
	$('#img-uploaded2').attr('src',userInfo.picture);
  $('#insert-name').text(userInfo.name);
  }
  else {
  console.log("User not logged in. What should I do?");
  
  }
}

function getBids() {
	$.ajax({ 
	url: 'https://oneweek-tickets.uc.r.appspot.com/api/bid/1',
	//TODO event-id(1) is hardcoded, should be dynamic = https://oneweektickets.com/api/bid/1
	//TODO redirection to oneweektickets.com/api does not work, needs to be fixed
	//'https://oneweektickets.com/api/event/' + urlParams.get('event'),
	type: 'GET',
	beforeSend: function (xhr) {
	    xhr.setRequestHeader('Authorization', 'Bearer ' + $("body").data('auth'));
	},
	contentType: 'application/json',
	success: async function (result) {
		//print out some <li>'s for each bid; date, time, amount per ticket, qty tickets, total (including service fees)
	
	
	 },
	error: function () { 
		$("#messageload").text("Oops!");
		$("#errorload").text("API error");
	},
	});
	
	
}