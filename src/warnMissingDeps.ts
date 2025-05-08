export function warnMissingPeerDeps(): void {
  const requiredDeps = ['sharp', '@napi-rs/canvas'];

  for (const dep of requiredDeps) {
    try {
      require.resolve(dep);
    } catch (_e) {
      // prefixed 'e' with an underscore
      console.warn(
        `⚠️ WARNING: Required peer dependency "${dep}" is not installed.\n` +
          `   Please run: npm install ${dep}`,
      );
    }
  }
}
