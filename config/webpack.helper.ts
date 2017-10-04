const PathHelper = {
	GetPath(...args: string[]): string {
		const result = [__dirname, "..", ...args];
		return result.join("/");
	}
};

export default PathHelper;