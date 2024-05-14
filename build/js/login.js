// Define the handleLogin function to handle form submission
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const url = "http://localhost:8080/api/v1/users/login";

    const basicAuth = utf8_to_b64(`${email}:${password}`);

    try {
        const response = await axios.post(
            url,
            {
                email: email,
                password: password,
            },
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("User Log In Success");
        console.log(response.data);
        localStorage.setItem("token", response.data.data.token)
        localStorage.setItem("username", response.data.data.userInfo.username)
        localStorage.setItem("email", response.data.data.userInfo.email)
        localStorage.setItem("roles", response.data.data.userInfo.roles)
        console.log(localStorage);

        enableNavigationLinks();
        populateAccountDetails(response.data.data.userInfo);

        window.location.hash = "#account";

    } catch (error) {
        console.error("Error logging in", error);
    }
}

async function populateAccountDetails(userInfo) {

    const { username, email, roles } = userInfo;

    console.log("Username Element:", username);
    console.log("Email Element:", email);
    console.log("Roles Element:", roles);

    // Populate the table with user details
    document.getElementById('username').textContent = username;
    document.getElementById('email').textContent = email;
    document.getElementById('roles').textContent = roles;

}
