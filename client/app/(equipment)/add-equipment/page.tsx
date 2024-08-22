"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EquipmentForm from "../EquipmentForm";

const AddEquipment = () => {
  return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Add a new Equipment</CardTitle>
      </CardHeader>
      <CardContent>
        <EquipmentForm />
      </CardContent>
    </Card>
  );
};

export default AddEquipment;
