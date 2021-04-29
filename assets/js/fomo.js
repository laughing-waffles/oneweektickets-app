//countdown clock

/****
$('#status').countdown('{{ page.auction-end }}', {elapse: true})
.on('update.countdown', function(event) {
  var $this = $(this);
  if (event.elapsed) {
    $this.html(event.strftime(''
      + '<p>%D days, %H hours, %M minutes, %S seconds</p>'));
  } else {
    $this.html(event.strftime(''
      + '<p>%D days, %H hours, %M minutes, %S seconds</p>'));
  }
});

**/



//bid management UI

function doBounce(element, times, distance, speed) {
    for(var i = 0; i < times; i++) {
        element.animate({marginLeft: '-='+distance}, speed)
            .animate({marginLeft: '+='+distance}, speed);
    }        
}


$( "#quantitybtn" ).click(function() {

});

$( "#continuebtn" ).click(function() {
	if ($('#amt').val() !== "") {
	$('#qty').val();
	$("#listqty").text($('#qty').val());
	$('#listqty').data("raw",$('#qty').val());
	
	
	$("#listbid").text(currency($('#amt').val()).format());
	$('#listbid').data("raw",currency($('#amt').val()));
	$("#listsub").text(currency($('#amt').val() * $('#qty').val()).format());
		$("#listsub").data("raw",currency($('#amt').val() * $('#qty').val()).format());
	$("#listfee").text(currency($('#amt').val()).multiply($('#qty').val()).multiply(.07).format());
	$("#listfee").data("raw",currency($('#amt').val()).multiply($('#qty').val()).multiply(.07));
	$("#listtotal").text(currency($('#listfee').data("raw")).add($('#listsub').data("raw")).format());
	}
	else {
        event.preventDefault();
        event.stopPropagation();	
	  doBounce($("#amt").parent(), 3, '10px', 300);   
 
	}
});
$("#loginbtn").click(function() {
	
	if ($("#termsagreed").prop("checked") === true) {
		login();		
	}
	else {
	
		  doBounce($("#termsagreed").parent(), 3, '10px', 300);   
	}
    event.preventDefault();
    event.stopPropagation();
});

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
  if (isAuthenticated) {
	  $("#loginbtn").text("Place Bid");
	  
	  //TODO: We should be looking up to see if they already have a bid, and change the UI to be "Modify Bid"
  }
}
const login = async () => {
  await auth0.loginWithRedirect({
	  redirect_uri: window.location.protocol + "//" + window.location.hostname +  (window.location.port ? ':' + window.location.port: '') + "/payment?amt=" + $('#listbid').data("raw") + "&qty=" + $('#listqty').data("raw")
  });
};

