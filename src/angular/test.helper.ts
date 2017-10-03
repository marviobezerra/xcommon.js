import { TestBed, ComponentFixture } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

export class TestBedHelper {

	public static Init() {
		TestBed.initTestEnvironment(
			BrowserDynamicTestingModule,
			platformBrowserDynamicTesting()
		);
	}

	public static SetupModule(declarations: any[]) {
		TestBed.configureTestingModule({
			imports: [BrowserDynamicTestingModule, FormsModule, ReactiveFormsModule],
			declarations: [declarations]
		});
	}

	public static CreateComponent<T>(type: any): ComponentFixture<T> {
		return TestBed.createComponent<T>(type);
	}
}