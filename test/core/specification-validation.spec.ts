import { Execute, ExecuteMessageType } from "../../scr/core";

describe("Execute", () => {
	it("Default state", () => {
		let execute = new Execute();

		expect(execute.HasErro).toEqual(false);
	});

	it("Add error message", () => {
		let execute = new Execute();
		execute.AddMessage(ExecuteMessageType.Error, "Error message");

		expect(execute.HasErro).toEqual(true);
		expect(execute.HasWarning).toEqual(false);
		expect(execute.HasException).toEqual(false);
	});

	it("Add warning message", () => {
		let execute = new Execute();
		execute.AddMessage(ExecuteMessageType.Warning, "Warning message");

		expect(execute.HasErro).toEqual(false);
		expect(execute.HasWarning).toEqual(true);
		expect(execute.HasException).toEqual(false);
	});

	it("Add exception message", () => {
		let execute = new Execute();
		
		execute.AddMessage(new Error("Error message"), "Error message");

		expect(execute.HasErro).toEqual(true);
		expect(execute.HasWarning).toEqual(false);
		expect(execute.HasException).toEqual(true);
	});
});