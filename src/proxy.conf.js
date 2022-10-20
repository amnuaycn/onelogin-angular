const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/auth"
        ],
        target: "https://<onelogin subdomain>.onelogin.com",
        changeOrigin: true,
        secure: true,
        logLevel: "debug", 
    }
]
module.exports = PROXY_CONFIG;