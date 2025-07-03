import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="lg:max-w-6xl mx-auto flex flex-col items-center justify-center py-28 sm:pt-32 transition-all animate-in">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center px-4 lg:max-w-4xl mb-6">
        Turn your words into{" "}
        <span className="underline underline-offset-0 decoration-dashed decoration-purple-200">
          captivating
        </span>{" "}
        blog posts
      </h1>
      <h2 className="text-center  sm:text-xl px-4 lg:max-w-4xl">
        Convert your videos into engaging content with our AI-powered blog
        writing tool.
      </h2>
      <Button
        variant={"link"}
        className=" mt-6 flex gap-2 item-center text-xl rounded-full px-12 py-8 lg:mt-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-colors font-bold hover:no-underline"
      >
        <Link href="/pricing">Get BlogMatic AI <ArrowRight className=""/></Link>
      </Button>
    </section>
  );
}
