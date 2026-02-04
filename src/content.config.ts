import { defineCollection, z } from "astro:content";

const header = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        email: z.string().email(),
        pone: z.string(),
        location: z.string(),
    }),
});

const employment = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        company: z.string(),
        location: z.string(),
        from: z.coerce.date(),
        to: z.coerce.date().optional(),
    }),
});

const education = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        institution: z.string(),
        location: z.string(),
        from: z.coerce.date(),
        to: z.coerce.date().optional(),
    }),
});

const languages = defineCollection({
    type: "data",
    schema: z.object({
        items: z.array(
            z.object({
                language: z.string(),
                level: z.string(),
            })
        )
    })
});

const skills = defineCollection({
    type: "data",
    schema: z.object({
        items: z.array(
            z.string()
        )
    })
});

const links = defineCollection({
    type: "data",
    schema: z.object({
        items: z.array(
            z.object({
                title: z.string(),
                link: z.string().url(),
            })
        )
    })
});

export const collections = {
    header,
    employment,
    education,
    languages,
    skills,
    links,
};