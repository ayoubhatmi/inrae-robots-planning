import { transformRobotData } from "@/lib/utils/data-utils";
import { formatAndCapitalize } from "../../../../lib/utils/utils";
import DetailsCard from "@/components/DetailsCard";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type RobotPageProps = {
  params: {
    id: string;
  };
};

async function getRobotById(id: string) {
  const res = await fetch(`${baseUrl}/robots/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return transformRobotData(data);
}

const page = async ({ params }: RobotPageProps) => {
  const robot = await getRobotById(params.id);
  // format robot details for display
  const robotDetails = Object.entries(robot).reduce(
    (acc: { key: string; value: any }[], [key, value]) => {
      if (key !== "image_data") {
        const formattedKey = formatAndCapitalize(key);
        acc.push({ key: formattedKey, value });
      }
      return acc;
    },
    []
  );

  return (
    <DetailsCard
      title="Robot Details"
      data={robotDetails}
      // hasAnImage={robot.image_data !== ""}
      image={robot.image_data !== "" ? robot.image_data : null}
      editBtnLink={`/update-robot/${robot.id}`}
      deleteUrl={`${baseUrl}/robots/${robot.id}`}
    />
  );
};

export default page;
