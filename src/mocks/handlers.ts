import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/me", () => {
    return HttpResponse.json({
      id: "1",
      email: "admin@example.com",
      roles: ["admin"],
      permissions: [
        "user:read",
        "project:read",
        "project:write",
        "billing:manage",
      ],
    });
  }),
];
