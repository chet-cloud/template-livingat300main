https://github.com/electron/electron/issues/19587



apiUrl = "https://github.com"
MockRequests.configure({
    [apiUrl]: "cc",
});
fetch(apiUrl).then(r=>r.text()).then(console.log)

