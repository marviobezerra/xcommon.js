import { TestBedHelper } from './angular.helper';
import { AutoFormComponent } from '../src/angular';
import { ComponentFixture } from '@angular/core/testing';



describe('Component: AutoForm', () => {

	let autoFormFixture: ComponentFixture<AutoFormComponent>;

	beforeAll(() => {
		TestBedHelper.Init();
	});

	beforeEach(() => {
		TestBedHelper.SetupModule([AutoFormComponent]);
		autoFormFixture = TestBedHelper.CreateComponent<AutoFormComponent>(AutoFormComponent);
		autoFormFixture.detectChanges();
	});

	afterAll(() => {
		autoFormFixture.destroy();
	})

	it("Check instance", () => {
		expect(autoFormFixture).not.toBeNull();
	});

	it("Check dependencies", () => {
		expect(autoFormFixture.componentInstance.formBuilder).not.toBeNull();
	});

	it("Check dependencies 2", () => {
		expect(autoFormFixture.componentInstance.formBuilder).not.toBeNull();
	});

	it("Check dependencies 3", () => {
		expect(autoFormFixture.componentInstance.formBuilder).not.toBeNull();
	});
});