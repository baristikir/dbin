import { Component } from "react";

export interface Doc {
	title: string;
	slug: string;
	sortByIndex: number;
	url: string;
	categoryName: string;
	active?: boolean;
	html?: string;
}

export interface DocSectionConfig {
	title: string;
	slug: string;
	icon?: Component;
}

export interface DocsConfig {
	sections: DocSectionConfig[];
	docs: Record<string, string>;
}

export type DocMetadata = Omit<Doc, "html">;

export interface DocCategory {
	title: string;
	slug: string;
	index: number;
	category: DocMetadata[];
}

export interface DocSection extends Omit<DocSectionConfig, "icon"> {
	section: DocCategory[];
}

export type DocsNavigation = DocSection[];
