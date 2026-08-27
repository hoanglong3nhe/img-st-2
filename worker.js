export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/" || path.includes(".") || path.startsWith("/IMG")) {
      return env.ASSETS.fetch(request);
    }

    const slug = path.replace(/^\//, "");
    const n = slug.match(/^anh(\d+)$/);
    const i = n ? n[1] : "3";
    const uniqueId = Date.now() + Math.random().toString(36).slice(2, 9);
    const imageUrl = `https://vidiy.fit/card.png`;
    const redirectUrl = "https://baggyrepackingrocky.com/2022576";

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>69:07</title>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="69:07">
  <meta name="twitter:description" content="Check out this amazing content!">
  <meta name="twitter:image" content="${imageUrl}">
  <meta property="og:image" content="${imageUrl}">
</head>
<body>
  <script>
    setTimeout(function(){ location.href = "${redirectUrl}"; }, 1000);
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};
