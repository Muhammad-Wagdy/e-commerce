import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import bootstrap from './src/main.server';

export function app() {
  const server = express();

  // For Vercel, use process.cwd() instead of import.meta.url
  const distFolder = process.cwd();
  const browserDistFolder = join(distFolder, 'dist/E-Commerce/browser');
  const indexHtml = join(browserDistFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files - use a different pattern
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: false
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

// Only run the server
