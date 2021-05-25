//do this first, because a successful auth0 wipes urlparams out.
const urlParams = new URLSearchParams(window.location.search);
var amt = urlParams.get("amt");
var qty = urlParams.get("qty");

let auth0 = null;
let stripe;
const fetchAuthConfig = () => fetch("/auth_config.json");
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience,
  });
};
window.onload = async () => {
  $("#messageload").text("Logging you in...");
  await configureClient();
  const isAuthenticated = await auth0.isAuthenticated();
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    const isCallback = await auth0.handleRedirectCallback();
    await updateUI();
    window.history.replaceState({}, document.title, location.protocol + "//" + location.host + location.pathname);
  } else {
    $("#messageload").text("Oops!");
    $("#errorload").html("You didn't get logged in. Please <a href='javascript:window.history.back();'>go back</a> and try again.");
  }
};

const updateUI = async () => {
  console.log("authenticated!");
  $("#messageload").text("Logged in!");
  $("body").data("auth", await auth0.getTokenSilently());
  enterBid();
};

function enterBid() {
  $("#messageload").text("Preparing your bid...");
  if (location.host == "127.0.0.1:4001") { var environ = "local"; }
  if (location.host == "staging.oneweektickets.com") { var environ = "staging"; }
  if (environ == undefined) { var environ = "prod"; }
  console.log("prep bid");
  const amountAsCent = Math.round(parseFloat(amt * 100));
  $.ajax({
    url: "https://oneweektickets.com/api/bid/1?env=" + environ,
    //TODO event-id(1) is hardcoded, should be dynamic = https://oneweektickets.com/api/bid/1
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + $("body").data("auth"));
    },
    contentType: "application/json",
    data: JSON.stringify({ currency: "USD", amount: amountAsCent, quantity: qty }),
    success: async function (result) {
      if (result.state == "BID_UPDATED") {
        window.location.replace("/bid-confirmation/");
      } else {
        $("#messageload").text("Sending you to the secure payment portal...");

        //TODO this should be done earlier
        stripe = Stripe(result.publishableKey);
        //get the sessionId to serve up stripe checkout
        //redirect to stripe checkout page?
        const stripeResponse = await stripe.redirectToCheckout({
          sessionId: result.sessionId,
        });

        if (stripeResponse.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          console.log(stripeResponse.error.message);
          $("#messageload").text("Oops!");
          $("#errorload").text(stripeResponse.error.message);
        }
      }
    },
    error: function () {
      $("#messageload").text("Oops!");
      $("#errorload").text("API error");
    },
  });
}
