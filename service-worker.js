const CACHE = "consulta-crachas-v11";

const arquivos = [
   "./",
    "./index.html",
    "./logo-branco.jpg",
    "./logo-laranja.png",
    "./script.js",
    "./style.css"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(arquivos))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});