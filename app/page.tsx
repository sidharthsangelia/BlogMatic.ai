import { Button } from "@/components/ui/button";
import Banner from "@/components/Home/Banner";
import Pricing from "@/components/Home/Pricing";
 

export default function Home() {
  return (
    <main className="mx-auto w-full inset-0 h-full bg-[radial-gradient(#e5e7eb_1px), transparent_1px]  [background-size:20px_20px]">
      
      <Banner />
      <Pricing/>
      {/* <Divider/>
   <HowItWorks/>
   <Divider/>
   <Pricing/>
   <Divider/>
   <Footer/> */}
    </main>
  );
}
