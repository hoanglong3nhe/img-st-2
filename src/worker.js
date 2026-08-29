export default {
  async fetch(request) {
    const url = new URL(request.url);

    const assetsHost =
      "https://image-redirect.hoanglong-3nhe.workers.dev";

    // Nếu truy cập trực tiếp /1.png, /2.png...
    const imageFileMatch = url.pathname.match(/^\/(\d+)\.png$/);

    if (imageFileMatch) {
      const imageNumber = Number(imageFileMatch[1]);

      if (imageNumber < 1 || imageNumber > 2040) {
        return new Response("Not found", { status: 404 });
      }

      // Giữ query để tạo URL ảnh mới nếu có
      const version =
        url.searchParams.get("v") ||
        Date.now().toString();

      return fetch(
        `${assetsHost}/${imageNumber}.png?v=${encodeURIComponent(version)}`
      );
    }

    // /api/anh1 -> số 1
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

    // Lấy version từ URL nếu có.
    // Ví dụ /api/anh1?v=12345
    const version =
      url.searchParams.get("v") ||
      Date.now().toString();

    const imageUrl =
      `${assetsHost}/${imageNumber}.png?v=${encodeURIComponent(version)}`;

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
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
  }
};
