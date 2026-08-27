// api/[slug].js - Vercel Serverless Function
export default function handler(req, res) {
  const { slug } = req.query;

  // const redirectUrl = "https://broadlyjukeboxunrevised.com/2053781";
  const redirectUrl = "https://incidentallyhorace.com/xsc1zidyau?key=f1210de962b8440f19c6b4deed575f41";

  const images = {};
  for (let i = 1; i <= 2040; i++) {
    images[`anh${i}`] = `https://www.rumchannel.store/IMG (${i}).png`;
  }

  const baseImageUrl = images[slug] || "https://www.rumchannel.store/IMG (3).png"; // Default to anh3's image or adjust as needed

  // ⭐️ THÊM UNIQUE ID để bypass Twitter cache
  const uniqueId = Date.now() + Math.random().toString(36).substring(2, 9);
  const imageUrl = `${baseImageUrl}?v=${uniqueId}`;

  const title = '69:07';
  const description = 'Check out this amazing content!';
  const url = `https://www.rumchannel.store/${slug}`;

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
  <meta property="og:url" content="${url}">
</head>
<body>
  <!-- <script>location.href='${redirectUrl}'</script> -->
  <script>
    setTimeout(function() {
        window.location.href = '${redirectUrl}';
    }, 1000); // 1000 milliseconds = 1 seconds
  </script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}