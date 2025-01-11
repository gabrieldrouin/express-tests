import { Request, Response } from "express";
import { getUserByIdHandler } from "#handlers/users.js";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockRequest = {
  params: {
    id: "1",
  },
} as unknown as Request;

const mockResponse = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
} as unknown as Response;

const mockUser = { id: 1, name: "one", age: 1, password: "one" };

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
