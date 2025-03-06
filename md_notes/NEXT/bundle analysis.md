# Next JS bundle analysis

- install the package:

```bash
npm i -DE @next/bundle-analyzer
```

- modify `next.config.ts`:

```ts
import withBundleAnalyzer from '@next/bundle-analyzer' // add this

// nextConfig ...

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
```

- run the command:

```bash
$env:ANALYZE="true"; npx next build
```