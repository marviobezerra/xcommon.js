export class SignInEntity {
	email: string;
	password: string;
}

export class PersonEntity {
	name: string;
	email: string;
	age: number;
	user: SignInEntity;
}


export class Level01 {
	level01Value: string;
	level02: Level02;
}

export class Level02 {
	level02Value: string;
	level03: Level03;
}

export class Level03 {
	level03Value: string;
}
