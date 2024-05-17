import { getRandomColor } from "@/lib/utils/utils";
import { Gantt, Task as GanttTask } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

type GanttChartProps = {
  data: any[];
};

const GanttChart = ({ data }: GanttChartProps) => {
  const transformedGanttData: GanttTask[] = data.map((event: any) => ({
    start: new Date(event.start_date),
    end: new Date(event.end_date),
    name: event.activity_name,
    id: "Task 0",
    type: "task",
    progress: 0,
    styles: { backgroundColor: getRandomColor() },
  }));

  return <Gantt tasks={transformedGanttData} />;
};

export default GanttChart;
