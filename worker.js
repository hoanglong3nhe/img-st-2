export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Lấy slug
    const match = url.pathname.match(/^\/api\/([^/]+)$/);
    const slug = match ? match[1] : "anh3";

    // Link chuyển hướng
    const redirectUrl = "https://baggyrepackingrocky.com/2022576";

    // anh1 -> 1.png
    // anh2 -> 2.png
    // anh3 -> 3.png
    // ...
    // anh2040 -> 2040.png

    let imageNumber = 3;

    const slugMatch = slug.match(/^anh(\d+)$/);

    if (slugMatch) {
      imageNumber = Number(slugMatch[1]);
    }

    // Giới hạn 1 -> 2040
    if (imageNumber < 1 || imageNumber > 2040) {
      imageNumber = 3;
    }

    // Ảnh nằm trong thư mục public/assets
    const imageUrl = `${url.origin}/${imageNumber}.png`;

    const title = "69:07";
    const description = "Check out this amazing content!";

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

  <title>${title}</title>

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:url" content="${redirectUrl}">

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
    window.location.href = ${JSON.stringify(redirectUrl)};
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
