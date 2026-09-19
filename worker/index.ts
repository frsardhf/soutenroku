/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import collectionIndex from "./collection-index.json";
import {fetchLiveRatings} from "./live-ratings";

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const RATINGS_CACHE_CONTROL="public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

async function liveRatingsResponse(request:Request,env:Env,ctx:ExecutionContext){
  const cacheKey=new Request(new URL("/api/ratings",request.url).toString(),{method:"GET"});
  const edgeCache=(caches as CacheStorage&{default?:Cache}).default;
  const cached=edgeCache?await edgeCache.match(cacheKey):undefined;
  if(cached)return cached;

  try{
    const payload=await fetchLiveRatings(collectionIndex);
    const response=new Response(JSON.stringify(payload),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":RATINGS_CACHE_CONTROL,"X-Content-Type-Options":"nosniff"}});
    if(edgeCache)ctx.waitUntil(edgeCache.put(cacheKey,response.clone()));
    return response;
  }catch(error){
    console.error("Live ratings update failed",error);
    return Response.json({error:"Live ratings are temporarily unavailable."},{status:502,headers:{"Cache-Control":"no-store"}});
  }
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if(url.pathname==="/api/ratings"&&request.method==="GET")return liveRatingsResponse(request,env,ctx);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
