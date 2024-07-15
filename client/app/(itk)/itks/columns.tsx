"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { RobotEssentials } from "../../../lib/types/index";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const columns: ColumnDef<RobotEssentials>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "itk_start_date",
    header: "Start date",
  },
  {
    accessorKey: "itk_end_date",
    header: "End date",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const itk = row.original;
      const router = useRouter();
      const { toast } = useToast();
      const ViewItk = (id: number) => {
        router.push("/itks/" + id);
      };

      const deleteItk = async (ItkId: number) => {
        if (confirm(`Are you sure to delete this ITK?`)) {
          try {
            // Step 1: Fetch all related tasks to this ITK
            const tasksResponse = await fetch(
              `${baseUrl}/configurations/itk/${ItkId}`
            );

            const tasks = await tasksResponse.json();

            console.log(tasks);
            // Step 2: Delete each related task and their related items
            for (const task of tasks) {
              const taskId = task.configuration_id;

              // Delete the ref between traj and config from configuration_ref table
              await fetch(
                `${baseUrl}/configurations-ref/configuration/${taskId}`,
                {
                  method: "DELETE",
                }
              );
              // Delete the task itself (config)
              await fetch(`${baseUrl}/configurations/itk/${ItkId}`, {
                method: "DELETE",
              });
            }

            // Step 3: Delete the ITK
            await fetch(`${baseUrl}/itks/${ItkId}`, {
              method: "DELETE",
            });

            toast({
              title: "Success",
              description:
                "ITK and its related tasks and items have been deleted.",
            });
            router.refresh();
          } catch (error) {
            toast({
              title: "Error",
              description:
                "Failed to delete ITK and its related tasks and items.",
            });
            console.error("Failed to delete ITK:", error);
          }
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => ViewItk(itk.id)}>
              View ITK details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteItk(itk.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
