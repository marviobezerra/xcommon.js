import { AutoFormService } from "./";
import { FormBuilder, Validators } from "@angular/forms";

interface IPerson {
	Name: string;
	Email: string;
}

describe("Angular Service: AutoForm", () => {

	let service: AutoFormService;

	let entity: IPerson;

	beforeEach(() => {
		service = new AutoFormService(new FormBuilder());

		entity = {
			Name: "Marvio André B. Silverio",
			Email: "marvio.bezerra@gmail.com"
		};
	});

	it("Check service instance", () => {
		expect(service).not.toBeNull();
	});

	it("Simple form", () => {

		const autoForm = service.createNew<IPerson>()
			.Build(entity);

		expect(autoForm.value).not.toBeNull();
		expect(autoForm.valid).toBe(true);
	});

	it("Simple form: add required validador", () => {

		const autoForm = service.createNew<IPerson>()
			.AddValidator(c => c.Name, Validators.required)
			.Build(entity);

		autoForm.controls["Name"].setValue("");
		expect(false).toBe(autoForm.valid);
	});

	it("Simple form: min leght validador", () => {

		const autoForm = service.createNew<IPerson>()
			.AddValidator(c => c.Name, Validators.minLength(10))
			.Build(entity);

		autoForm.controls["Name"].setValue("Marvio");
		expect(false).toBe(autoForm.valid);
	});

	it("Simple form: add email validador", () => {

		const autoForm = service.createNew<IPerson>()
			.AddValidator(c => c.Email, [Validators.email, Validators.required])
			.Build(entity);

		autoForm.controls["Email"].setValue("marvio.bezerra");
		expect(false).toBe(autoForm.valid);
	});
});