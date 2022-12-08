const urls = [
    'https://artisreit-com-t1.azurewebsites.net/about-us/manitoba-accessible-customer-service-policy/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/letter-to-unitholders/', 
    'https://artisreit-com-t1.azurewebsites.net/covid-19/statement-on-covid-19/', 
    'https://artisreit-com-t1.azurewebsites.net/covid-19/', 
    'https://artisreit-com-t1.azurewebsites.net/christmas/', 
    'https://artisreit-com-t1.azurewebsites.net/governance-documents/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/investor-presentations/', 
    'https://artisreit-com-t1.azurewebsites.net/about-us/privacy-policy/', 
    'https://artisreit-com-t1.azurewebsites.net/360-main-building-envelope-300-main-announcement/', 
    'https://artisreit-com-t1.azurewebsites.net/merry-christmas-2014/', 
    'https://artisreit-com-t1.azurewebsites.net/our-portfolio/development/', 
    'https://artisreit-com-t1.azurewebsites.net/merry-christmas-2013/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/tax-information/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/contact-information/', 
    'https://artisreit-com-t1.azurewebsites.net/legal/', 
    'https://artisreit-com-t1.azurewebsites.net/terms/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/distribution-history/', 
    'https://artisreit-com-t1.azurewebsites.net/about-us/corporate-profile/', 
    'https://artisreit-com-t1.azurewebsites.net/contact/', 
    'https://artisreit-com-t1.azurewebsites.net/newsroom/', 
    'https://artisreit-com-t1.azurewebsites.net/careers/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/regulatory-filings/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/analyst-coverage/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/about-drip/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/stock-quote/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/conference-calls/', 
    'https://artisreit-com-t1.azurewebsites.net/our-portfolio/portfolio-overview/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/quarterly-reports/', 
    'https://artisreit-com-t1.azurewebsites.net/our-portfolio/leasing-contact-information/', 
    'https://artisreit-com-t1.azurewebsites.net/our-portfolio/portfolio-map/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/', 
    'https://artisreit-com-t1.azurewebsites.net/', 
    'https://artisreit-com-t1.azurewebsites.net/our-portfolio/', 
    'https://artisreit-com-t1.azurewebsites.net/about-us/environmental-social-governance/', 
    'https://artisreit-com-t1.azurewebsites.net/about-us/corporate-governance/', 
    'https://artisreit-com-t1.azurewebsites.net/about-us/trustees/', 
    'https://artisreit-com-t1.azurewebsites.net/about-us/management/', 
    'https://artisreit-com-t1.azurewebsites.net/about-us/', 
    'https://artisreit-com-t1.azurewebsites.net/investor-link/annual-reports/'
]

const https = require('https');

const db = {}

urls.map(url=>{
    setTimeout(()=>{
        https.get(url, (res)=>{
            //console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
            res.on('data', (d)=>{
                const response = d.toString()
                if (response.includes("Please contact Artisreit IT team to add your IP address to the whitelist")) {
                    console.log(url)
                }
                console.log(url)
            }
            );
        }).on('error', (e)=>{
            console.error(e);
        });
    },2000)

})
