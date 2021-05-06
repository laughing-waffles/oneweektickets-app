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
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    console.log('handle redirect');
	   		const isCallback = await auth0.handleRedirectCallback();
			window.history.replaceState({}, document.title, location.protocol + '//' + location.host + location.pathname);
		}
       console.log('post redirect');

	
		
  if (isAuthenticated) {
	if (window.location.pathname.includes("login-gateway") === true) {
		console.log('true');
		window.location.replace("/u/account-settings/profile/");
	}
	
   console.log(JSON.stringify(
     await auth0.getUser()
    ));
    $("#messageload").text("Done!");
	$('body').data("auth", await auth0.getTokenSilently());
      var userInfo = await auth0.getUser()
	
	$('#img-uploaded').attr('src',userInfo.picture);
	$('#img-uploaded2').attr('src',userInfo.picture);
  $('#insert-name').text(userInfo.name);
  
  getBids();
  }
  else {
	  //user not logged in; redirect to auth0 to login
	  
	  await auth0.loginWithRedirect({
		  redirect_uri: window.location.protocol + "//" + window.location.hostname +  (window.location.port ? ':' + window.location.port: '') + "/u/account-settings/profile/"
	  });
  
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
		console.log(result);
		$(result).each(function(index) {
      var event = index + 1;
			$('.event-' + event + ' > .bid').text(currency(this.amount/100).format());
			$('.event-' + event + ' > .datetime').text(this.bidDay + " " + this.bidTime);
			$('.event-' + event + ' > .name').text(this.name);			
			$('.event-' + event + ' > .qty').text(this.quantity);
      $('.event-' + event).data("event", event);
      switch (this.state) {
      case 'CANCEL':
        console.log("cancelled");
    		$('.event-' + event).addClass("bg-light text-dark");
        $('.event-' + event + ' > .state').text("Bid Withdrawn");
        $('.event-' + event + ' > .actions > .cancelbtn').hide();
        break;
      case 'ACTIVE':
        $('.event-' + event + ' > .state').text("Bid Active, Not Won Yet");        
        break;
      case 'ENDED':
                $('.event-' + event + ' > .state').text("Bid Lost");
        break;
      case 'PURCHASE_COMPLETE':
                $('.event-' + event + ' > .state').text("Bid Won!");
        break;
        
        			
      }
      $('.event-' + event).show();
		})
	 },
	error: function () { 
		$("#messageload").text("Oops!");
		$("#errorload").text("API error");
	},
	});
	
	
}

$(".cancelbtn").click(function() {
  cancelBid($(this).parent().parent().parent().data("event"))
});
function cancelBid(which) {
  var r = confirm("Are you sure you want to cancel your bid?\nThis will fully withdraw your bid.");
  if (r == true) {
	$.ajax({ 
	url: 'https://oneweek-tickets.uc.r.appspot.com/api/bid/cancel/' + which,
	//TODO event-id(1) is hardcoded, should be dynamic = https://oneweektickets.com/api/bid/1
	//TODO redirection to oneweektickets.com/api does not work, needs to be fixed
	//'https://oneweektickets.com/api/event/' + urlParams.get('event'),
	type: 'POST',
	beforeSend: function (xhr) {
	    xhr.setRequestHeader('Authorization', 'Bearer ' + $("body").data('auth'));
	},
	contentType: 'application/json',
	success: async function (result) {
		$('.event-' + which).addClass("bg-light text-dark");
	  
	 },
	error: function () { 
		$("#messageload").text("Oops!");
		$("#errorload").text("API error");
	},
	});
}
  
}