export default async function handler(req, res) {
  try {
    // Dynamically import the Angular server
    const { default: render } = await import('../dist/E-Commerce/server/server.mjs');

    // Let Angular SSR handle the request
    return render(req, res);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Internal Server Error');
  }
}
