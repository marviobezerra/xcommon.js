import { Input, AfterViewInit, ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
	selector: 'textarea[autosize]'
})

export class TextAreaAutosize implements AfterViewInit {

	private el: HTMLElement;
	private minHeightValue: string;
	private maxHeightValue: string;
	private lastHeightValue: number;
	private clientWidthValue: number;

	constructor(public element: ElementRef) {
		this.el = element.nativeElement;
		this.clientWidthValue = this.el.clientWidth;
	}

	@Input('minHeight')
	public get minHeight(): string {
		return this.minHeightValue;
	}
	public set minHeight(val: string) {
		this.minHeightValue = val;
		this.updateMinHeight();
	}

	@Input('maxHeight')
	public get maxHeight(): string {
		return this.maxHeightValue;
	}
	public set maxHeight(val: string) {
		this.maxHeightValue = val;
		this.updateMaxHeight();
	}

	@HostListener('window:resize', ['$event.target'])
	public onResize(textArea: HTMLTextAreaElement): void {
		if (this.el.clientWidth === this.clientWidthValue) {
			return;
		}

		this.clientWidthValue = this.element.nativeElement.clientWidth;
		this.adjust();
	}

	@HostListener('input', ['$event.target'])
	public onInput(textArea: HTMLTextAreaElement): void {
		this.adjust();
	}

	public ngAfterViewInit(): void {
		const style = window.getComputedStyle(this.el, null);

		if (style.resize === 'both') {
			this.el.style.resize = 'horizontal';
		}

		if (style.resize === 'vertical') {
			this.el.style.resize = 'none';
		}

		this.adjust();
	}

	private adjust(): void {

		this.el.style.overflow = 'hidden';
		this.el.style.height = 'auto';
		this.el.style.height = this.el.scrollHeight + 'px';
	}

	private updateMinHeight(): void {
		this.el.style.minHeight = this.minHeightValue + 'px';
	}

	private updateMaxHeight(): void {
		this.el.style.maxHeight = this.maxHeightValue + 'px';
	}

}