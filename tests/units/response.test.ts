import { sendResponse } from "../../src/utils/response";

describe("Send response Utils", () => {
  it("should send a SUCCESS response for status code below 400", () => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    sendResponse(res, 200, "Success message", { id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        message: "Success message",
        data: { id: 1 },
      })
    );
  });
});
