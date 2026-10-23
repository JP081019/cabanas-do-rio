import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const localIPv4Addresses = Object.values(networkInterfaces()).flatMap((addresses) =>
  (addresses ?? [])
    .filter(
      ({ family, internal, address }) =>
        family === "IPv4" &&
        !internal &&
        /^(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)/.test(address),
    )
    .map(({ address }) => address),
);

const nextConfig: NextConfig = {
  // The dev WebSocket must trust the hostname used to access this machine.
  // Resolve private interface addresses at startup so DHCP changes need no code edit.
  allowedDevOrigins: ["localhost", "127.0.0.1", ...new Set(localIPv4Addresses)],
};

export default nextConfig;
