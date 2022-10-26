https://github.com/electron/electron/issues/19587


apiUrl = "https://github.com"
MockRequests.configure({
    [apiUrl]: "cc",
});
fetch(apiUrl).then(r=>r.text()).then(console.log)


MockRequests.setDynamicMockUrlResponse(searchApiPathname, {
    // `response` field not needed because we don't need an initial `response` value
    dynamicResponseModFn: (request, response, queryParamMap) => {
        const searchQuery = decodeURIComponent(queryParamMap.q);
        return `You searched for ${searchQuery}`;
    },
    usePathnameForAllQueries: true
});

```js

MockRequests.configureDynamicResponses({
    [myApiUrl]: {
        response: {},
        dynamicResponseModFn: (request, response) => {
 

            return response;
        }
    }



})


    jQuery.ajaxSetup({
        dataFilter: function (data, type) {
            //modify the data
            debugger
            return data;
        }
    });



```




