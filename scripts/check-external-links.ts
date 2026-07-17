const destinations = [
  "https://github.com/jpollard-github/spotify-history-analyzer",
  "https://github.com/jpollard-github/mood-switcher",
  "https://arcadeghosts.org",
];

async function main() {
  for (const destination of destinations) {
    const response = await fetch(destination, { redirect: "follow", signal: AbortSignal.timeout(20_000) });
    if (!response.ok) throw new Error(`${destination} returned HTTP ${response.status} after redirecting to ${response.url}`);
    console.log(`${destination} → ${response.url} (${response.status})`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
