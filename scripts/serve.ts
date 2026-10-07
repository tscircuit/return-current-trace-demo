import {resolve,sep} from 'node:path';
const root=resolve('public');
const server=Bun.serve({port:3000,async fetch(request){const url=new URL(request.url);const filePath=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!filePath.startsWith(root+sep))return new Response('Not found',{status:404});const file=Bun.file(filePath);return await file.exists()?new Response(file):new Response('Not found',{status:404});}});
console.log(`DDR return-current viewer: http://localhost:${server.port}`);
