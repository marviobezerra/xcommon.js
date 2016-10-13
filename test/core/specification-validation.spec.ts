import chai = require('chai');
var expect = chai.expect;

import { Execute, ExecuteMessageType } from "../../scr/core";

describe("Execute", () => {
	it("Default state", () => {
		let execute = new Execute();

		expect(execute.HasErro).to.be.false;
	});

	it("Add error message", () => {
		let execute = new Execute();
		execute.AddMessage(ExecuteMessageType.Error, "Error message");

		expect(execute.HasErro, "Check error").to.be.true;
		expect(execute.HasWarning, "Check warning").to.be.false;
		expect(execute.HasException, "Check exception").to.be.false;
	});

	it("Add warning message", () => {
		let execute = new Execute();
		execute.AddMessage(ExecuteMessageType.Warning, "Warning message");

		expect(execute.HasErro, "Check error").to.be.false;
		expect(execute.HasWarning, "Check warning").to.be.true;
		expect(execute.HasException, "Check exception").to.be.false;
	});

	it("Add exception message", () => {
		let execute = new Execute();
		
		execute.AddMessage(new Error("Error message"), "Error message");

		expect(execute.HasErro, "Check error").to.be.true;
		expect(execute.HasWarning, "Check warning").to.be.false;
		expect(execute.HasException, "Check exception").to.be.true;
	});
});