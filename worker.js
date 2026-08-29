export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Nếu không phải /api/... thì phục vụ file trong public
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // /api/anh3 -> số 3
    const match = url.pathname.match(/^\/api\/anh(\d+)$/);

    if (!match) {
      return new Response("Not found", {
        status: 404
      });
    }

    let imageNumber = Number(match[1]);

    if (imageNumber < 1 || imageNumber > 2040) {
      imageNumber = 3;
    }

    const redirectUrl =
      "https://baggyrepackingrocky.com/2022576";

    // Ảnh nằm trong public/1.png, public/2.png...
    const imageUrl =
      `${url.origin}/${imageNumber}.png`;

    const title = "69:07";
    const description =
      "Check out this amazing content!";

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

  <title>${title}</title>

  <meta name="twitter:card"
        content="summary_large_image">

  <meta name="twitter:title"
        content="${title}">

  <meta name="twitter:description"
        content="${description}">

  <meta name="twitter:image"
        content="${imageUrl}">

  <meta name="twitter:url"
        content="${url.href}">

  <meta property="og:type"
        content="website">

  <meta property="og:title"
        content="${title}">

  <meta property="og:description"
        content="${description}">

  <meta property="og:image"
        content="${imageUrl}">

  <meta property="og:image:width"
        content="1200">

  <meta property="og:image:height"
        content="630">

  <meta property="og:url"
        content="${url.href}">
</head>

<body>

<script>
setTimeout(function() {
  window.location.href =
    ${JSON.stringify(redirectUrl)};
}, 1000);
</script>

</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type":
          "text/html; charset=UTF-8",
        "Cache-Control":
          "no-store"
      }
    });
  }
};
