const siteMetadata = {
    title: 'CodeWithGanesh',
    author: 'Ganesh',
    headerTitle: 'CodeWithGanesh',
    description: 'A blog about web development and other cool stuff',
    language: 'en-us',
    theme: 'system', // system, dark or light
    siteUrl: 'https://codewithganesh.com',
    siteRepo: 'https://github.com/IGaneshD/codewithganesh',
    siteLogo: '/static/images/logo.png',
    socialBanner: '/static/images/twitter-card.png',
    email: 'address@yoursite.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com/Twitter',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://www.linkedin.com',
    locale: 'en-US',
    analytics: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
        umamiAnalytics: {
            // We use an env variable for this setting to avoid exposing the
            // ID to the client-side bundles during build.
            umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
        },
        // plausibleAnalytics: {
        //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
        // },
        // simpleAnalytics: {},
        // posthogAnalytics: {
        //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
        // },
        // googleAnalytics: {
        //   googleAnalyticsId: '', // e.g. G-XXXXXXX
        // },
    },
    newsletter: {
        // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
        // Please add your .env file and modify it according to your selection
        provider: 'buttondown',
    },
    search: {
        provider: 'kbar', // kbar or algolia
        kbarConfig: {
            searchDocumentsPath: 'search.json', // path to load documents to search
        },
        // provider: 'algolia',
        // algoliaConfig: {
        //   // The application ID
        //   appId: 'R2IYF7ETH7',
        //   // The search API key
        //   apiKey: '599cec31baffa4868cae4e79f180729b',
        //   // The index name
        //   indexName: 'docsearch',
        // },
    },
}

export default siteMetadata
