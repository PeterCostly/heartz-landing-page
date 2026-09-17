import { preview } from "astro";

async function main() {
  const server = await preview({
    root: ".",
    server: { port: 4321, host: true }
  });
  console.log("HEARTz Astro preview server listening on port 4321");
}

main().catch((err) => {
  console.error("Preview server error:", err);
  process.exit(1);
});
