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

//determine what the state of the UI should be
$( document ).ready(function() {

var nowNOW = Math.round((new Date()).getTime() / 1000);
if (nowNOW < $('.container').data("auctionstart")) {
  
  console.log("Showing countdown");
  
  $('#auctionsoon #clock').countdown( $('.container').data("auctionstart")*1000, function(event) {
	  var format = '%-H:%M:%S';
	    if(event.offset.totalDays > 0) {
	      format = '%-d day%!d ' + format;
	    }
	    if(event.offset.weeks > 0) {
	      format = '%-w week%!w ' + format;
	    }
	    $(this).html(event.strftime(format));
  });
 $("#auctionsoon").removeClass("d-none").show();
  
}
if (nowNOW > $('.container').data("auctionstart") && nowNOW < $('.container').data("auctionend")) {
	console.log("Auction is live!");
    $("#auctionlive").removeClass("d-none").show();
	
    $('.auctionclock').countdown($('.container').data("auctionend")*1000, function(event) {
      $(this).html(event.strftime('Auction ends in: %D days %H:%M:%S'));
    });
}

if (nowNOW > $('.container').data("auctionend")) {
	console.log("Auction is over");
    $("#auctionended").removeClass("d-none").show();
}
	
});

//bid management UI

function doBounce(element, times, distance, speed) {
    for(var i = 0; i < times; i++) {
        element.animate({marginLeft: '-='+distance}, speed)
            .animate({marginLeft: '+='+distance}, speed);
    }        
}
function runMath() {

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
$("#overview").slideDown();

}
$( "#qty" ).change(function() {
	runMath();
});
$( "#amt" ).keyup(function() {
	if ($('#amt').val() !== "") {
	runMath();
	}
	else {

			event.preventDefault();
			event.stopPropagation();	
			doBounce($("#amt").parent(), 3, '10px', 300);   
	}
});
var loginType;
$(".loginbtn").click(function() {
	
	if ($("#termsagreed").prop("checked") === true) {

    loginType = $(this).data("logintype");
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
	if ($("#amt").val() == '') { $("#overview").hide(); } else { runMath(); }
	
  await configureClient();
  const isAuthenticated = await auth0.isAuthenticated();
  if (isAuthenticated) {
	  $("#loginbtn").text("Place Bid");
	  
	  //TODO: We should be looking up to see if they already have a bid, and change the UI to be "Modify Bid"
  }
}
const login = async () => {
  await auth0.loginWithRedirect({
	  redirect_uri: window.location.protocol + "//" + window.location.hostname +  (window.location.port ? ':' + window.location.port: '') + "/payment?amt=" + $('#listbid').data("raw") + "&qty=" + $('#listqty').data("raw"),
    screen_hint: loginType
  });
};

