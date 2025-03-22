export interface AlertsOptions {
	links: boolean;
	bem?: boolean;
	tag?: string;
	role?: boolean;
	types?: string[];
}
export interface ContainerOptions {
	marker?: string;
	validate?: any;
	render?: any;
}

export interface ContainerToken {
	markup: string;
	block: boolean;
	info: string;
	map: number[];
}
export interface ContainerSettings {
	startLine: number;
	endLine: number;
	silent: boolean;
	pos?: number;
	nextLine?: number;
	marker_count?: number;
	markup?: string;
	params?: string;
	token?: ContainerToken;
	old_parent?: string;
	old_line_max?: number;
	auto_closed: boolean;
	start: number;
	max: number;
}
