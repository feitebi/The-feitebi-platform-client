const express = require("express");
const sm = require("sitemap");
const next = require("next");
const LRUCache = require("lru-cache");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const schema = require("./graphql");
const URL = require("url");
const { join } = require("path");
const cookie = require("cookie");
const axios = require("axios");

const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || "127.0.0.1";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: !dev ? 1000 * 60 * 10 : 1000 * 60
});

app.prepare().then(() => {
  const server = express();

  // Use the `renderAndCache` utility defined below to serve pages
  server.get("/", (req, res) => {
    return renderAndCache(req, res, "/");
  });

  server.get("/coin/:id--:coin", (req, res) => {
    return renderAndCache(req, res, "/coin", req.params);
  });

  server.get("/coin/:coin", (req, res) => {
    return renderAndCache(req, res, "/coin", req.params);
  });

  /**
   * Generate sitemap
   */
  server.get("/sitemap.xml", async (req, res) => {
    const { data } = await axios.get("http://coincap.io/coins/");
    const sitemap = sm.createSitemap({
      hostname: "https://cryptoin.site",
      cacheTime: 86400000, // 1 day
      urls: data.map(coin => ({
        url: `/coin/${coin}`,
        changefreq: "daily",
        priority: 0.8,
        lastmodrealtime: true,
        lastmodfile: "pages/coin.jsx"
      }))
    });
    res.header("Content-Type", "application/xml");
    res.send(sitemap.toString());
  });

  server.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({
      schema,
      tracing: true,
      cacheControl: {
        defaultMaxAge: 5
      }
    })
  );
  if (dev) {
    server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
  }

  server.get("*", (req, res) => {
    const { pathname } = new URL.parse(req.url);
    if (["/service-worker.js"].indexOf(pathname) > -1) {
      return app.serveStatic(req, res, join(__dirname, ".next", pathname));
    }
    if (["/robots.txt"].indexOf(pathname) > -1) {
      return app.serveStatic(req, res, join(__dirname, "static", pathname));
    }
    return handle(req, res);
  });

  server.listen(port, host, err => {
    if (err) throw err;
    // console.log(`> Ready on http://localhost:${port}`);
  });
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  const { cryp_lng, cryp_currency } = (req.headers.cookie &&
    cookie.parse(req.headers.cookie)) || {
    cryp_lng: undefined,
    cryp_currency: undefined
  };
  return `${req.url}-locale:${req
    .acceptsLanguages()
    .slice(0, 2)
    .toString()}-currency:${cryp_currency}-lng:${cryp_lng}`;
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader("x-cache", "HIT");
    return res.send(ssrCache.get(key));
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader("x-cache", "MISS");
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}
