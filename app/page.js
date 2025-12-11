import { gethomePage } from "./../data/gethomePage";
import { HeroSection } from "./components/blocls/heroSection";
import { InfoBlock } from "./components/blocls/InfoBlocks";

async function loader() {
  const data = await gethomePage();
  console.log("data:", data);
  return { data };
}

export default async function Page() {
  const { data } = await loader(); // yahan AWAIT zaroori hai
  const blocks = data?.data?.blocks || [];
  console.log("page data:", data);

  return (
    <div>
      {/* <h1 className="text-white">{data?.data?.Title}</h1>
      <p>{data?.data?.Description}</p> */}

      <HeroSection {...blocks[0]} />
      <InfoBlock {...blocks[1]} />
      <InfoBlock {...blocks[2]} />
    </div>
  );
}
 