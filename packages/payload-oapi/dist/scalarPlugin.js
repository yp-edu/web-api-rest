const scalar =
  ({ specEndpoint = '/openapi.json', docsUrl = '/docs', enabled = true, hideModels = false }) =>
  ({ endpoints = [], ...config }) => {
    if (!enabled) {
      return { ...config, endpoints }
    }
    return {
      ...config,
      endpoints: [
        ...endpoints,
        {
          method: 'get',
          path: docsUrl,
          handler: async (req) => {
            const fullSpecUrl = `${req.protocol}//${req.headers.get('host')}/api${specEndpoint}`
            const html = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>API Docs</title>
                <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
                <script>
                  document.addEventListener('DOMContentLoaded', function () {
                    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    Scalar.createApiReference('#scalar-api', {
                      url: '${fullSpecUrl}',
                      theme: theme,
                      ${hideModels ? 'hideModels: true,' : ''}
                    });
                  });
                </script>
              </head>
              <body>
                <div id="scalar-api"></div>
              </body>
              </html>`
            return new Response(html, {
              headers: { 'content-type': 'text/html' },
            })
          },
        },
      ],
    }
  }
export default scalar
//# sourceMappingURL=scalarPlugin.js.map
