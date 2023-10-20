import SliderList from "@/components/SliderList";
import MainLayout from "@/components/MainLayout";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="md:text-5xl text-3xl mb-4 text-center">
        Random Quote Generator
      </div>
      <Link href="/favquotes" className="mb-6 block  text-blue-500 text-center">
        Go To Favorite Quotes &#8594;
      </Link>
      <SliderList />
    </MainLayout>
  );
}
