import { Component, OnInit} from '@angular/core';
import { IconService } from '../../services/icon.service';

@Component({
	selector: 'icon-list',
    template: `
		<div layout="row" flex content="start" wrap>
			<div layout="column" content="center" class="icon-list-item" *ngFor="let item of Items">
				<icon [icon]="item"></icon>
				<span class="icon-list-item-text">{{item}}</span>
			</div>
		</div> 
	`,
    styles: [`
		.icon-list-item {
			height: 100px;
			width: 100px;
		}

		.icon-list-item:hover {
			background-color: #cccccc;
		}

		.icon-list-item .icon-list-item-text {
			padding: 10px; 
		}
	`]
})
export class IconListComponent implements OnInit {

    public Items: Array<string> = [];

    constructor(private iconService: IconService) {
    }

    public ngOnInit(): void {

        for (let property in this.iconService.Shapes) {
            this.Items.push(property);
        }
    }
}