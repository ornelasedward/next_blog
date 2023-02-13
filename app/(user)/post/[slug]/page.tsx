import { groq } from "next-sanity";
import Image from "next/image";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "./RichTextComponents";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60; // revalidate this page every 60 seconds

export async function generateStaticParams() {
  const query = groq`*[_type=='post']
    {
      slug
    }`;

  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

async function Post({ params: { slug } }: Props) {
  const query = groq`*[_type=='post' && slug.current == $slug][0]
    {
      ...,
      author->,
      categories[]->
    }`;

  const post: Post = await client.fetch(query, { slug: slug });

  return (
    <article className="pb-28">
      <section className="space-y-2 border border-[#4F46E5] text-white">
        <div className="relative min-h-56 flex flex-col justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          <section className="p-5 bg-[#4F46E5] w-full ">
            <div className="flex flex-col justify-between gap-y-5 max-w-[1280px] m-auto">
              <div>
                <h1 className="text-4xl font-extrabold py-5">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="max-w-[1280px] m-auto">
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-start mt-auto space-x-2">
                {post.categories.map((category) => (
                  <div
                    key={category._id}
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-10 justify-end max-w-[1280px] m-auto">
              <Image
                className="rounded-full"
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
                height={40}
                width={40}
              />

              <div className="w-64">
                <h3 className="text-lg font-bold">{post.author.name}</h3>
                <div className="line-clamp-2 text-ellipsis text-xs text-white">
                  <PortableText
                    value={post.author.bio}
                    components={RichTextComponents}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className="py-10 px-2 max-w-[1280px] m-auto">
        <PortableText value={post.body} components={RichTextComponents} />
      </div>
    </article>
  );
}

export default Post;
