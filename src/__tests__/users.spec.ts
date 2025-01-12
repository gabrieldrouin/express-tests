import { getUserByIdHandler } from "#handlers/users.js";
import { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockRequest = {
  params: {
    id: "1",
  },
} as unknown as Request;

const mockResponse = {
  json: vi.fn().mockReturnThis(),
  status: vi.fn().mockReturnThis(),
} as unknown as Response;

const mockUser = { age: 1, id: 1, name: "one", password: "one" };

const mockNext = vi.fn();

describe("get users", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get user by id", async () => {
    await getUserByIdHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status).toHaveBeenCalledOnce();
    expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
  });

  it("should call status 400 when id format is invalid", async () => {
    mockRequest.params.id = "NaN";
    await getUserByIdHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status).toHaveBeenCalledOnce();
  });

  it("should call status 404 when user not found", async () => {
    mockRequest.params.id = "100";
    await getUserByIdHandler(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.status).toHaveBeenCalledOnce();
  });
});
