// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// console.log("Hello from Functions!")
//
// Deno.serve(async (req) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }
//
//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/unsplash-random-photo' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    const accessKey = Deno.env.get("UNSPLASH_ACCESS_KEY");
    const { count = 4, orientation = "landscape" } = await req.json();
    const params = new URLSearchParams({
      count,
      orientation,
    }).toString();
    const headers = {
      Authorization: `Client-ID ${accessKey}`,
    };
    const response = await fetch(
      `https://api.unsplash.com/photos/random?${params}`,
      {
        headers,
      },
    );
    const data = await response.json();
    const photos = data.map(({ urls, alt_description, blur_hash }) => ({
      full: urls.full,
      thumb: urls.thumb,
      alt: alt_description ?? "",
      blurHash: blur_hash,
    }));

    return new Response(JSON.stringify(photos), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
