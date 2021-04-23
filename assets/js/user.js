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
      var userInfo = await auth0.getUser()
	
	$('#img-uploaded').attr('src',userInfo.picture);
  }
  else {
  console.log("User not logged in. What should I do?");
  
  }
}