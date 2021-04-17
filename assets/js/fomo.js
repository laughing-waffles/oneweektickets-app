$( "#quantitybtn" ).click(function() {
	$('#qty').val();
	$("#listqty").text($('#qty').val());
	$('#listqty').data("raw",$('#qty').val());
});

$( "#pricebtn" ).click(function() {
	$("#listbid").text(currency($('#amt').val()).format());
	$('#listbid').data("raw",currency($('#amt').val()));
	$("#listsub").text(currency($('#amt').val() * $('#qty').val()).format());
		$("#listsub").data("raw",currency($('#amt').val() * $('#qty').val()).format());
	$("#listfee").text(currency($('#amt').val()).multiply($('#qty').val()).multiply(.07).format());
	$("#listfee").data("raw",currency($('#amt').val()).multiply($('#qty').val()).multiply(.07));
	$("#listtotal").text(currency($('#listfee').data("raw")).add($('#listsub').data("raw")).format());
});


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
}
const login = async () => {
  await auth0.loginWithRedirect({
	  redirect_uri: "http://127.0.0.1:4000/payment?amt=" + $('#listbid').data("raw") + "&qty=" + $('#listqty').data("raw")
  });
};

