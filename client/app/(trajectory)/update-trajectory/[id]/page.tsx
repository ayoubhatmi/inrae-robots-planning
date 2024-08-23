"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateTrajectoryForm from "./UpdateTrajectoryForm";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
type updateTrajectoryPageProps = {
  params: {
    id: string;
  };
};

const updateTrajectoryPage = ({ params }: updateTrajectoryPageProps) => {
  const url = `/api/trajectories/${params.id}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const trajName = data[0].traj_name;
  const activity = data[0].activity_id.toString();
  const robot = data[0].robot_id.toString();

  const defaultValues = {
    name: trajName,
    activity: activity,
    robot: robot,
  };
   return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Update Trajectory</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateTrajectoryForm params={params} defaultValues={defaultValues} />
      </CardContent>
      <CardFooter>
        <p className="text-sm">
          <span className="font-semibold">Note:</span> To modify the trajectory
          points or the associated plot, please delete the current trajectory
          and upload the updated trajectory file.
        </p>
      </CardFooter>
    </Card>
  );
};

export default updateTrajectoryPage;
