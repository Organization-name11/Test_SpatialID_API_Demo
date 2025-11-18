module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/spatial-id.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
(()=>{
    const e = new Error("Cannot find module 'ouranos-gex-lib-for-javascript'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
function handler(req, res) {
    const { lat, lon, zoom = '25', alt } = req.query;
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    const zoomNum = parseInt(zoom, 10);
    const altNum = alt !== undefined ? parseFloat(alt) : undefined;
    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
        res.status(400).json({
            error: 'lat と lon は必須です'
        });
        return;
    }
    if (latNum < -85.0511287798 || latNum > 85.0511287798) {
        res.status(400).json({
            error: 'lat の範囲は ±85.0511287798'
        });
        return;
    }
    if (lonNum < -180 || lonNum > 180) {
        res.status(400).json({
            error: 'lon の範囲は ±180'
        });
        return;
    }
    if (zoomNum < 0 || zoomNum > 35) {
        res.status(400).json({
            error: 'zoom は 0〜35'
        });
        return;
    }
    try {
        const space = new Space({
            lng: lonNum,
            lat: latNum,
            alt: altNum
        }, zoomNum);
        res.setHeader('Access-Control-Allow-Origin', '*'); // デモ用CORS
        res.status(200).json({
            result: {
                zfxyStr: space.zfxyStr,
                tilehash: space.tilehash,
                zfxy: space.zfxy,
                zoom: space.zoom,
                center: space.center,
                alt: space.alt
            }
        });
    } catch (e) {
        res.setHeader('Access-Control-Allow-Origin', '*'); // デモ用CORS
        res.status(500).json({
            error: String(e)
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__69a283db._.js.map