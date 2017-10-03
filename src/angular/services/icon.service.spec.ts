import { IconService } from "./";

describe("Angular Service: Icon", () => {

	let service: IconService;

	beforeEach(() => {
		service = new IconService();
	});

	it("Check service instance", () => {
		expect(service).not.toBeNull();
	});
});