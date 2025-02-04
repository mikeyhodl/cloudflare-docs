import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const notes = await getCollection("changelogs-next");

	notes.sort((a, b) => a.data.date.getTime() - b.data.date.getTime());

	return rss({
		title: "Changelogs",
		description: `Cloudflare changelogs`,
		site: "https://developers.cloudflare.com/changelog-next/",
		items: notes.map((entry) => {
			return {
				title: entry.data.title,
				description: entry.data.description,
				pubDate: entry.data.date,
				link: `/changelog-next/${entry.id}/`,
			};
		}),
	});
};
