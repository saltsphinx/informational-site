import fs from "fs/promises";
import { createServer } from "http";

const routes = {
  "/": "./dist/index.html",
  "/about": "./dist/about.html",
  "/contact-me": "./dist/contact-me.html",
};

const notFoundRoute = "./dist/404.html";

const httpServer = createServer(async (req, res) => {
  const reqUrl = new URL(req.url, "http:" + req.headers.host);
  const route = routes[reqUrl.pathname] || notFoundRoute;
  let template;
  let routeContent;

  try {
    template = await fs.readFile("./dist/template.html", "utf-8");
    routeContent = await fs.readFile(route, "utf-8");
  } catch (error) {
    throw error;
  }

  res.setHeader("Content-Type", "text/html");
  res.end(template.replace(/(%content)/i, routeContent));
});

httpServer.listen("8080");
