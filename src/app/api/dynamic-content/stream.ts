export const config = { runtime: "edge" };

export default async function handler() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("⏳ Loading...\n"));
      setTimeout(
        () => controller.enqueue(encoder.encode("🚀 First Chunk\n")),
        1000
      );
      setTimeout(
        () => controller.enqueue(encoder.encode("✅ Final Chunk\n")),
        2000
      );
      setTimeout(() => controller.close(), 3000);
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/plain" } });
}
