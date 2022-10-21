const {loadPosts} = require("./data.js")
const { Index, Document, Worker } = require("flexsearch");

/**
 
{
        "id": 1979,
        "date": "2018-11-28T15:51:19",
        "date_gmt": "2018-11-28T15:51:19",
        "guid": {
            "rendered": "https://livingat300main.ca/?p=1979"
        },
        "modified": "2022-05-25T16:56:56",
        "modified_gmt": "2022-05-25T16:56:56",
        "slug": "a-new-look-for-downtown-winnipeg",
        "status": "publish",
        "type": "post",
        "link": "https://livingat300main.ca/a-new-look-for-downtown-winnipeg/",
        "title": {
            "rendered": "A new look for downtown Winnipeg"
        },
        "content": {
            "rendered": "<p><iframe loading=\"lazy\" title=\"300 Main—a new look for downtown Winnipeg\" width=\"1200\" height=\"675\" src=\"https://www.youtube.com/embed/jPBKk9vZCWc?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></p>\n<p><span class=\"\">There is an energy in our city—downtown is rising up, and will soon provide over 400 new luxury apartment homes for Winnipegers desiring to be in the centre of it all.</span></p>\n<p><span class=\"\"> We are extremely excited to be underway and look forward to the next steps in this adventure. For more information or to follow this development visit: <a href=\"https://300main.ca\">300main.ca</a></span></p>\n<p><img loading=\"lazy\" class=\"alignnone wp-image-417\" src=\"http://livingat300main.ca/wp-content/uploads/2018/11/300-Main-Logo-Blue150.jpg\" alt=\"300 Main Winnipeg Apartment Living\" width=\"96\" height=\"96\" srcset=\"https://arwebstore.blob.core.windows.net/livingat300main-ca/2018/11/300-Main-Logo-Blue150.jpg 150w, https://arwebstore.blob.core.windows.net/livingat300main-ca/2018/11/300-Main-Logo-Blue150-100x100.jpg 100w\" sizes=\"(max-width: 96px) 100vw, 96px\" /></p>\n",
            "protected": false
        },
        "excerpt": {
            "rendered": "<p>There is an energy in our city—downtown is rising up, and will soon provide over 400 new luxury apartment homes for Winnipegers desiring to be in the centre of it all</p>\n",
            "protected": false
        },
        "author": 1,
        "featured_media": 1984,
        "comment_status": "open",
        "ping_status": "closed",
        "sticky": false,
        "template": "",
        "format": "video",
        "meta": [],
        "categories": [
            65,
            27
        ],
        "tags": [
            68,
            243,
            214,
            38,
            114,
            67,
            66,
            319,
            74,
            56,
            116,
            321,
            318,
            108,
            320,
            95,
            96
        ]
    }


 */
const index = new Document({
    index: ["tag", "name", "title", "text"],
    worker: true,
    store: true
});

loadPosts().map(post=>index.add(post))
